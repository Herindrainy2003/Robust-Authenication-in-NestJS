import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { //utilisation de passportjs pour la strategies
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // Définit 'email' comme le champ de nom d'utilisateur
  }

  // Strategies pour valider les utilisateurs

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password); //appelle a notre fonction validateuser pour verifier notre email et mot passe
  
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
