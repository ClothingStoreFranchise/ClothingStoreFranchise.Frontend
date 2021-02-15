import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'any' })
export class AlertService {

    constructor(private _snackBar: MatSnackBar) {}

    success(message: string, options?: any) {
      let config = new MatSnackBarConfig();
      config.duration = 7000;
      config.panelClass = ['success-alert'];
      this.openSnackBar(message, config);
    }

    error(message: string, options?: any) {
      let config = new MatSnackBarConfig();
      config.duration = 7000;
      config.panelClass = ['error-alert'];
        this.openSnackBar(message, config);
    }

    info(message: string, options?: any) {
      let config = new MatSnackBarConfig();
      config.duration = 7000;
      config.panelClass = ['info-alert'];
        this.openSnackBar(message, config);
    }

    warn(message: string, options?: any) {
        let config = new MatSnackBarConfig();
      config.duration = 7000;
      config.panelClass = ['warn-alert'];
        this.openSnackBar(message, config);
    }

    clear() {
      this._snackBar.dismiss();
    }

    private openSnackBar(message: string, config: MatSnackBarConfig) {

      this._snackBar.open(message, 'Close', config);
    }
}
