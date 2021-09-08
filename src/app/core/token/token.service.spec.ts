import {TokenService} from './token.service';

describe('O serviço TokenService',()=>{

  let token, service;

  it('Deve ser instanciado',()=>{
    const service = new TokenService();
    expect(service).toBeTruthy();
  })

  it('Deve guardar o Token',()=>{
    expect(service).toBeTruthy();
    service.setToken(token);
    expect(service.hasToken()).toBeTruthy()
    expect(service.getToken()).toBe("valorDoToken")
  })

  it('Deve limpar o local storage',()=>{
    service.setToken(token);
    service.removeToken();
    //Deve ser false
    expect(service.hasToken()).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  })

  // Executado depois de cada testes
  afterEach(()=>{
    localStorage.clear()
  })

  /** Executada antes de cada teste, assim reaproveitamos o código sem repetir no it **/
  beforeEach(()=>{
    token = 'valorDoToken';
    service = new TokenService();
  })

})
