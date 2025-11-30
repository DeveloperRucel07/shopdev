import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]',
})
export class ClickStopPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
}
