import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'gc-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements AfterViewInit {
  currentGalleryItemSrc: string;
  currentGalleryItemAlt: string;
  isActive: boolean = false;
  currentIndex: number = 0;
  sliderCount: number = 0;

  @ViewChild('gallery') gallery: ElementRef;

  constructor(private renderer: Renderer2) {}


  ngAfterViewInit(): void {
    if (!this.currentGalleryItemSrc) {
      const images = [...this.gallery.nativeElement.querySelectorAll('img')];
      this.sliderCount = images.length;

      images.map((item: HTMLElement, index: number) => {
        this.renderer.setAttribute(item, 'data-index', `${index}`);
      });

      this.setActiveSlide(0);
    }
  }

  setActiveSlide(currentIndex: number) {
    const itemsArray = [...this.gallery.nativeElement.querySelectorAll('img')];

    itemsArray.map((item: HTMLElement) => {
      this.renderer.removeClass(item, 'active');
    });

    itemsArray.map((item: HTMLElement, index) => {
      if (index === currentIndex) {
        console.log(index)
        const src = item.getAttribute('src');
        const alt = item.getAttribute('alt');
        this.renderer.addClass(item, 'active');

        if (src) {
          this.currentGalleryItemSrc = src;
          this.currentGalleryItemAlt = alt;
        }
      }
    });
  }

  changeItem(event: any): void {
    const targetItem = event.target;
    this.currentIndex = Number(targetItem.dataset.index);
    this.setActiveSlide(this.currentIndex);
    console.log(targetItem)
  }

  goToPrevious(): void {
    const itemsArray = [...this.gallery.nativeElement.querySelectorAll('img')];
    itemsArray.map((item: HTMLElement, index) => {
      if (index === this.currentIndex && (index) > 0) {
        this.setActiveSlide(index - 1);
      }
    });
    if (this.currentIndex > 0) {
      this.currentIndex = this.currentIndex - 1;
    }

    this.transformSlides();
  }

  goToNext(): void {
    const itemsArray = [...this.gallery.nativeElement.querySelectorAll('img')];
    const arrayLength = itemsArray.length - 1;
    itemsArray.map((item: HTMLElement, index) => {
      if (index === this.currentIndex && (index + 1) <= arrayLength) {
        this.setActiveSlide(index + 1);
      }
    });

    if (this.currentIndex < arrayLength) {
      this.currentIndex = this.currentIndex + 1;
    }

    this.transformSlides();
  }

  transformSlides(): void {
    const galleryInner = [...this.gallery.nativeElement.querySelectorAll('p')];
    let transformValue = 0;
    if (this.currentIndex > 3) {
      transformValue = (this.currentIndex - 3) * 25;
    }
    else {
      transformValue = 0
    }

    galleryInner.map((item: HTMLElement) => {
      this.renderer.setStyle(item, 'transform', 'translateX(-' + transformValue + '%)')
      this.renderer.setStyle(item, 'transition', '0.5s');
    });

  }
}
