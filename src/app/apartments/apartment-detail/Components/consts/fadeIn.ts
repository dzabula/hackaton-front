import { trigger, transition, useAnimation,style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('200ms', style({ opacity: 0 }))
    ])
  ]);