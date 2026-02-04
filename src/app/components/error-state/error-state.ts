import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  imports: [CommonModule],
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss',
})
export class ErrorState {
  @Input() title = 'Ups 😕';
  @Input() message = 'Algo salió mal. Intenta nuevamente.';
  @Input() actionLabel = 'Reintentar';

  @Output() retry = new EventEmitter<void>();
}
