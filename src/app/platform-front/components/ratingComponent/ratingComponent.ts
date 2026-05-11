import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-rating-component',
  imports: [],
  templateUrl: './ratingComponent.html',
  styleUrl: './ratingComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  rating = input.required<number>()
}
