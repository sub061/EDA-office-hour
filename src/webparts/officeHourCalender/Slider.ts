export class Slider {
  private wrapper: HTMLElement;
  private items: HTMLElement;
  private prev: HTMLElement;
  private next: HTMLElement;

  private posInitial: number = 0;

  private slides: HTMLCollectionOf<Element>;
  private slidesLength: number;
  private slideSize: number;
  private index: number = 0;
  private allowShift: boolean = true;

  constructor(
    wrapper: HTMLElement,
    items: HTMLElement,
    prev: HTMLElement,
    next: HTMLElement
  ) {
    this.wrapper = wrapper;
    this.items = items;
    this.prev = prev;
    this.next = next;
    this.slides = items.getElementsByClassName("slide");
    this.slidesLength = this.slides.length;
    this.slideSize = (this.slides[0] as HTMLElement).offsetWidth;


      this.init();
      
    console.log('this.items ----> ', this.items);
    this.updateSlideButtons();
  }

  private init(): void {
    console.log("init");

    this.wrapper.classList.add("loaded");

 

    this.prev.addEventListener("click", () => {
      this.shiftSlide(-1);
    });
    this.next.addEventListener("click", () => {
      this.shiftSlide(1);
    });
    this.items.addEventListener("transitionend", this.checkIndex.bind(this));
    console.log("itemssss ---->", this.items)
  }

  // private dragStart(e: MouseEvent | TouchEvent): void {
  //   e.preventDefault();
  //   this.posInitial = this.items.offsetLeft;

  //   if (e.type == "touchstart") {
  //     this.posX1 = (e as TouchEvent).touches[0].clientX;
  //   } else {
  //     this.posX1 = (e as MouseEvent).clientX;
  //     document.onmouseup = this.dragEnd.bind(this);
  //     document.onmousemove = this.dragAction.bind(this);
  //   }
  // }

  // private dragAction(e: MouseEvent | TouchEvent): void {
  //   if (e.type == "touchmove") {
  //     this.posX2 = this.posX1 - (e as TouchEvent).touches[0].clientX;
  //     this.posX1 = (e as TouchEvent).touches[0].clientX;
  //   } else {
  //     this.posX2 = this.posX1 - (e as MouseEvent).clientX;
  //     this.posX1 = (e as MouseEvent).clientX;
  //   }
  //   this.items.style.left = this.items.offsetLeft - this.posX2 + "px";
  // }

  // private dragEnd(): void {
  //   console.log("drag shift");
  //   this.posFinal = this.items.offsetLeft;
  //   if (this.posFinal - this.posInitial < -this.threshold) {
  //     this.shiftSlide(1, "drag");
  //   } else if (this.posFinal - this.posInitial > this.threshold) {
  //     this.shiftSlide(-1, "drag");
  //   } else {
  //     this.items.style.left = this.posInitial + "px";
  //   }

  //   document.onmouseup = null;
  //   document.onmousemove = null;
  // }

  private shiftSlide(dir: number, action?: string): void {
  this.items.classList.add("shifting");
  console.log("slider shift");
  console.log("action", action);
  console.log("posInitial", this.posInitial);
  console.log("offsetLeft", this.items.offsetLeft);

  if (this.allowShift) {
    if (!action) {
      this.posInitial = this.items.offsetLeft;
    }

    if (dir === 1) {
      this.items.style.left = this.posInitial - this.slideSize + "px";
      this.index++;
    } else if (dir === -1) {
      this.items.style.left = this.posInitial + this.slideSize + "px";
      this.index--;
    }

    console.log(' this.items.style.left', this.items.style.left);

    // Update button states
    this.updateSlideButtons();
  }

  this.allowShift = false;
}

private checkIndex(): void {
  this.items.classList.remove("shifting");
  console.log("index shift");
  if (this.index === -1) {
    this.items.style.left = -(this.slidesLength * this.slideSize) + "px";
    this.index = this.slidesLength - 1;
  }

  if (this.index === this.slidesLength) {
    this.items.style.left = -(1 * this.slideSize) + "px";
    this.index = 0;
  }

  this.allowShift = true;

  // Update button states
  this.updateSlideButtons();
}

private updateSlideButtons(): void {
  const leftButton = document.getElementById('prev') as HTMLAnchorElement;
  const rightButton = document.getElementById('next') as HTMLAnchorElement;

  if (this.index <= 0) {
    leftButton.classList.add("disabled");
  } else {
    leftButton.classList.remove("disabled");
  }

  if (this.index >= this.slidesLength - 1) {
    rightButton.classList.add("disabled");
  } else {
    rightButton.classList.remove("disabled");
  }
}

}