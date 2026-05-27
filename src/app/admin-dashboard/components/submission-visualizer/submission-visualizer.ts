import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExamplePdfViewerComponent } from "../example-pdf-viewer/example-pdf-viewer.component";

@Component({
  selector: 'app-submission-visualizer',
  imports: [ExamplePdfViewerComponent],
  templateUrl: './submission-visualizer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionVisualizer {
  url = input.required<string>();
 }
