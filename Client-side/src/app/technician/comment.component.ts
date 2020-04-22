import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SignatureFieldComponent } from './signature-field/signature-field.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styles: []
})
export class CommentComponent implements OnInit {
  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;

  Form: FormGroup;
  submitting = false;
  loading = false;
  public errMessage: string;
  public secondSig: SignatureFieldComponent;
  task; workStart; workEnd; state; street; city; zipCode; org; flaggers; cones; signs; boards; duration;

  amount = 0.00;
  billableHours;
  flagger_rate;
  actual_duration;
  createdBy;

  // public signaturePadOptions = {
  //   minWidth: 2,
  //   maxWidth: 2,
  //   canvasWidth: 300,
  //   canvasHeight: 60
  // }

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private projectService: ProjectService,
    private message: NzMessageService,
    private _router: Router
    ) { }

    id = +this._route.snapshot.paramMap.get('id');

  ngOnInit(): void {
   this.projectService.getTaskById(this.id).subscribe(res => {
      console.log(res)
       this.task = res;
       this.workStart = this.task.workStart;
       this.workEnd = this.task.workEnd;
       this.street = this.task.street;
       this.state = this.task.state;
       this.city = this.task.city;
       this.zipCode = this.task.zipCode;
       this.org = this.task.org;
       this.cones = this.task.cones;
       this.signs = this.task.signs;
       this.flaggers = this.task.flaggers;
       this.boards = this.task.boards;
       this.duration = this.task.flagger_duration
       this.flagger_rate = this.task.flagger_rate,
       this.createdBy = this.task.supervisor,
       this.calculateBill(this.duration, this.flaggers);
       this.actualDuration(this.workEnd, this.workStart);
       console.log(this.createdBy);
    });

    this.Form = this.fb.group({
      actual_duration: [null, [Validators.required]],
      billable_duration: [null,[Validators.required]],
      client_rate: [null,[Validators.required]],
      bill: [null, [Validators.required]],
      supervisorId: [null, [Validators.required]],
      signature: [null, [Validators.required]]
   });
  }

  submitForm() {

    if (this.Form.invalid) {
      this.displayValidationErrors();
      return;
    }
   console.log(this.Form.value)

    this.loading = true;
   this.projectService.updateTaskBill(this.id, this.Form.value).subscribe((res:any) => {
      this.loading = false;
      this.completeTask(this.id)
      this.message.create('success', `Submitted successfully`);
      this._router.navigate(['technician'])
    },
    (error: any) => {
      this.loading = false;
      this.errMessage = error.error.message;
      console.log(error);
    }
    );
  }

  displayValidationErrors() {
    for (const i in this.Form.controls) {
      this.Form.controls[ i ].markAsDirty();
      this.Form.controls[ i ].updateValueAndValidity();
    }
  }

  calculateBill(time: number, flaggers: number) {
     if(time <= 4){
        this.billableHours = 4;
        this.amount = this.billableHours * flaggers * this.flagger_rate
        this.Form.patchValue({
          bill: this.amount,
          billable_duration: this.billableHours,

        });
     }else {
      this.billableHours = time;
      this.amount = this.billableHours * flaggers * this.flagger_rate
      this.Form.patchValue({
        bill: this.amount,
        billable_duration: this.billableHours
      });
     }
  }

  actualDuration(end, start) {
    this.actual_duration = ((new Date(end).getMinutes()) - (new Date(start).getMinutes()))
    this.Form.patchValue({
      actual_duration: this.actual_duration,
      supervisorId: this.createdBy
    });
  }

  completeTask(taskId: number) {
    this.projectService.startTask(taskId, {status: "COMPLETE"}).subscribe((res:any) => {
      console.log(res)
    }, (err: any) => {
      console.log(err);
    });
  }

  public ngAfterViewInit() {
    this.secondSig = this.sigs.find((sig, index) => index === 1);
    this.beResponsive();
    this.setOptions();
  }

   // set the dimensions of the signature pad canvas
   public beResponsive() {
    console.log('Resizing signature pad canvas to suit container size');
    this.size(this.sigContainer1.first, this.sigs.first);
  }

  public size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public setOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(255, 0, 0)');
  }

  public clear() {
    this.sigs.first.clear();
  }

  // onSaveHandler() {
  //   const base64 = this.signaturePad.toDataURL('image/png', 0.5)
  //   this.Form.patchValue({
  //     signature: base64
  //   })
  // }

}
