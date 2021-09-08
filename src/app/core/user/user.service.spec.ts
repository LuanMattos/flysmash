import {UserService} from './user.service';
import {TestBed} from '@angular/core/testing';


describe('Serviço User Service', ()=> {
  let service:UserService

  beforeEach(()=>{
    //Comentado para user TestBed
    // tokenService = new TokenService()
    // service = new UserService(tokenService)

/** fornece métodos para criar componentes e serviços em testes de unidade. (já pega as instâncias do Angular) **/
/** É Lento **/
    TestBed.configureTestingModule({
      providers:[UserService]
    })
    service = TestBed.get(UserService);

  })

  it('Deve ser instanciado',()=>{
      expect(service).toBeTruthy()
  })

  it('Retorna o nome de usuário decodificando token JWT',()=>{
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiIsInVzZXJfbmFtZSI6ImpvYW8iLCJ1c2VyX2Z1bGxOYW1lIjoiam9hbyIsInVzZXJfZW1haWwiOiJqb2FvQGFsdXJhcGljLmNvbS5iciJ9.NDYwNzBkNGJmOTM0ZmIwZDRiMDZkOWUyYzQ2ZTM0Njk0NGUzMjI0NDQ5MDBhNDM1ZDdkOWE5NWU2ZDc0MzVmNQ data';
    service.setToken(token)
    expect(service.isLogged()).toBeTruthy()
    expect(service.getUserName()).toBe('joao')

    service.getUserByToken().subscribe(user=>{
      expect(user.user_name).toBe('joao')
    })

  })



});
