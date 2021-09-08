import {AuthService} from '../../core/auth/auth.service';

export function appInitializer(authService: AuthService): any {
  return () => new Promise(resolve => {
    authService.refreshToken()
      .subscribe()
      .add(resolve);
  });
}
