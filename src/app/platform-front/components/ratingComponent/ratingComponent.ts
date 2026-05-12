import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-component',
  imports: [ReactiveFormsModule],
  templateUrl: './ratingComponent.html',
  styleUrl: './ratingComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  rating = input.required<string>()
  control = input.required<FormControl>()

}
