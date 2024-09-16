// STUBS: MOCKS Y SPIES

import { getDataByAxios } from "./fetch";
import axios from "axios";

// -->> MOCK

jest.mock("axios"); //de esta manera estamos mocking a axios
// que quiere decir, que axios va a dejar de funcionar, no devolvera un response.data, sino que será undefined porque no habrá llamada hecha. Asi que -->

describe("getDataByAxios", () => {
  //-->> EJEMPLO MOCK:

  //   it("MOCK -- should return data -- MOCK ", async () => {
  //     const data = {
  //       userId: 1,
  //       id: 1,
  //       title: "delectus aut autem",
  //       body: "Lorem itsum",
  //     };
  //     // ¿ QUE ÉS UN MOCK ? Un mock reemplaza completamente una función o método.
  //     // --> aquí hacemos una simulacion y un metodo get con axios moqueado que tendrá un valor que va a ser data. Esto sirve para ver si nuestra lógica de test funcionan, independientemente de de lo que valga data. La idea de moquear es simular una llamada, ya que no siempre podremos tener acceso a una api, pero los test tiene que realizarse sí o si para comprobar que nuestro codigo funciona.
  //     axios.get.mockResolvedValue({ data });
  //     //Act
  //     const result = await getDataByAxios();
  //     expect(axios.get).toHaveBeenCalled(); // Cubrimos que la función ha sido llamada
  //     expect(result).toEqual(data);
  //   });

  //-->> EJEMPLO SPY:
  //   it("SPY -- should return data -- SPY", async () => {
  //     const data = {
  //       userId: 1,
  //       id: 1,
  //       title: "delectus aut autem",
  //       completed: false,
  //     };
  //     // ¿QUE ES UN SPY? Los spies solo pueden espiar metodos. Monitorea las llamadas a una función, permitiéndote verificar su comportamiento sin cambiarla, aunque puede configurarse para modificar su comportamiento si se desea.
  //     // RECORDATORIO: Un METODO es una función que se define como una propiedad de un objeto.
  //     // ESTRUCTURA DEL SPY: jest.spyOn(objeto, 'nombreDelMétodo');
  //     // Crear un spy sobre axios.get para monitorizar las llamadas.
  //     // __ALBAAA NOTA IMPORTANTE SUBNORMAL__ definir que axios.get se va a espiar antes de hacer la llamada, si no no monitoriza

  //     const spy = jest.spyOn(axios, "get");
  //     const result = await getDataByAxios();

  //     // Verificar que el resultado de la función es correcto
  //     expect(result).toEqual(data);

  //     // Verificar que axios.get fue llamado
  //     expect(spy).toHaveBeenCalled();

  //     // Verificar que axios.get fue llamado con el argumento correcto (si hay una URL)
  //     expect(spy).toHaveBeenCalledWith(expect.any(String));

  //     //Si se quiere, se puede añadir mas información cuando se utiliza spy con mensajes:
  //     //Aquí añadimos console.log() para imprimir las llamadas hechas
  //     console.log("Llamadas a axios.get:", spy.mock.calls); // [ [ 'https://jsonplaceholder.typicode.com/todos/1' ] ]
  //     console.log("Resultados de axios.get:", spy.mock.results); // [ { type: 'return', value: Promise { [Object] } } ]
  //   });
  //-->> MOCK Y SPY JUSTOS:

  it("MOCK & SPY -- should return data -- MOCK & SPY", async () => {
    const data = {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      body: "Lorem itsum",
    };
    axios.get.mockResolvedValue({ data });

    //Act
    const spy = jest.spyOn(axios, "get");
    const result = await getDataByAxios();
    expect(axios.get).toHaveBeenCalled();
    expect(result).toEqual(data);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expect.any(String));
    console.log("Llamadas a axios.get:", spy.mock.calls);
    console.log("Resultados de axios.get:", spy.mock.results);
  });

  it("should return error", async () => {
    const error = new Error("error");

    //aqui simulamos que la promesa es reject por lo que sale por el catch.
    axios.get.mockRejectedValue(error);

    // En lugar de mocks, tambien podríamos usar spies, que es una alternativa de los mocks

    const spy = jest.spyOn(console, "error").mockImplementation(() => {
      return console.log(
        "Con .mockImplementation --> Le he cambio el comportamiento al error!!, ahora le he sicho que tie un console.log con este mismo mensaje"
      );
    });
    //act
    await getDataByAxios();
    expect(axios.get).toHaveBeenCalled();
    // comprobamos si axios.get ha sido llamada
    expect(spy).toHaveBeenCalled();
  });
});
