import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy{
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
  
  currentIndex = 0;
  totalCards = 7;
  // cards = [
  //   { image: '../assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' },
  //   { image: 'assets/Abdulshakoor.jpg', name: 'Card Title 1', role: 'Teacher' }
  // ];

  private interval: any;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.autoSlide();
      this.cdr.detectChanges(); // Ensure changes are detected after view initialization
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  autoSlide(): void {
    this.interval = setInterval(() => {
      this.next();
    }, 3000); // Slide every 3 seconds
  }

  next(): void {
    if (this.currentIndex < this.totalCards - 3) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.updateSlider();
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalCards - 3; // Show last 3 cards
    }
    this.updateSlider();
  }

  updateSlider(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cardSlider = document.querySelector('.card-slider') as HTMLElement;
      if (cardSlider) {
        this.renderer.setStyle(cardSlider, 'transform', `translateX(-${this.currentIndex * 33.33}%)`);
      }
    }
  }






}
