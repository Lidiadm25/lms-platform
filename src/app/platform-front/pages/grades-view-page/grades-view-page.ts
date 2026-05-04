import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TaskService } from '../../../projects/services/TaskService';
import { ProjectService } from '../../../projects/services/ProjectService';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/interfaces/project.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { GradeService } from '../../../projects/services/GradeService';

@Component({
  selector: 'app-grades-view-page',
  imports: [],
  templateUrl: './grades-view-page.html',
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesViewPage { 
  gradeService = inject(GradeService)

  activatedRoute = inject(ActivatedRoute);
 
  projectId = signal<string>('');
  
 gradeResource = rxResource({
    params: () => ({id: this.projectId()}),
    stream: ({params}) => {
     
        return this.gradeService.getGradesFromProject(params.id)
    },
  });

  ngOnInit(){
    this.activatedRoute. parent!.paramMap.subscribe((params) => {
        const lesson = params.get('idProject') ?? '';
        this.projectId.set(lesson);
      });
    
     
    }

}
