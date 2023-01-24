import React from "react";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import testData from "../../cypress/mocks/testData";
import { act } from 'react-dom/test-utils';

const spyFetch = jest.spyOn(global, "fetch");

describe("testes do App.JSX", () => {
  beforeEach(() => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("se os inputs e buttons estão presentes", async () => {
    const filterNameInput = screen.getByRole("textbox");
    const numberInput = screen.getByRole("spinbutton");
    const radioAsc = screen.getByRole("radio", { name: /asc/i });
    const radioDesc = screen.getByRole("radio", { name: /desc/i });
    const removeAllFiltersButton = await screen.findByRole("button", {
      name: /remover filtros/i,
    });
    const filterButton = await screen.findByRole("button", { name: /filter/i });
    const submitButton = await screen.findByRole("button", {
      name: /submit order/i,
    });
    const columnFilter = await screen.getByTestId("column-filter");
    const comparisonFilter = await screen.getByTestId("comparison-filter");
    const columnSort = await screen.getByTestId("column-sort");

    expect(filterNameInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(radioAsc).toBeInTheDocument();
    expect(radioDesc).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(removeAllFiltersButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(columnSort).toBeInTheDocument();
  }, 40000);

  test("se os elementos iniciais da tabela estao presentes", async () => {
    const headerName = await screen.findByRole("columnheader", {
      name: /name/i,
    });
    const headerNameRotation = await screen.findByRole("columnheader", {
      name: /rotation_period/i,
    });
    const headerOrbital = await screen.findByRole("columnheader", {
      name: /orbital_period/i,
    });
    const headerDiameter = await screen.findByRole("columnheader", {
      name: /diameter/i,
    });
    const headerClimate = await screen.findByRole("columnheader", {
      name: /climate/i,
    });
    const headerGraviy = await screen.findByRole("columnheader", {
      name: /gravity/i,
    });
    const headerTerrain = await screen.findByRole("columnheader", {
      name: /terrain/i,
    });
    const headerSurface = await screen.findByRole("columnheader", {
      name: /surface_water/i,
    });
    const headerPopulation = await screen.findByRole("columnheader", {
      name: /population/i,
    });
    const planetTatooine = await screen.findByRole("cell", {
      name: /tatooine/i,
    });
    const planetAlderan = await screen.findByRole("cell", {
      name: /alderaan/i,
    });
    const planetYavin = await screen.findByRole("cell", { name: /yavin iv/i });
    const planetHoth = await screen.findByRole("cell", { name: /hoth/i });
    const namePlanets = await screen.findAllByTestId(/planet-name/);
    const planetDagobah = await screen.findByRole("cell", { name: /dagobah/i });
    const planetBespin = await screen.findByRole("cell", { name: /bespin/i });
    const planetEndor = await screen.findByRole("cell", { name: /endor/i });
    const planetNaboo = await screen.findByRole("cell", { name: /naboo/i });
    const planetCoruscant = await screen.findByRole("cell", {
      name: /coruscant/i,
    });
    const planetKamino = await screen.findByRole("cell", { name: /kamino/i });

    expect(headerName).toBeInTheDocument();
    expect(headerNameRotation).toBeInTheDocument();
    expect(headerOrbital).toBeInTheDocument();
    expect(headerDiameter).toBeInTheDocument();
    expect(headerClimate).toBeInTheDocument();
    expect(headerGraviy).toBeInTheDocument();
    expect(headerTerrain).toBeInTheDocument();
    expect(headerSurface).toBeInTheDocument();
    expect(headerPopulation).toBeInTheDocument();
    expect(planetTatooine).toBeInTheDocument();
    expect(planetAlderan).toBeInTheDocument();
    expect(planetYavin).toBeInTheDocument();
    expect(planetHoth).toBeInTheDocument();
    expect(namePlanets).toHaveLength(10);
    expect(planetDagobah).toBeInTheDocument();
    expect(planetBespin).toBeInTheDocument();
    expect(planetEndor).toBeInTheDocument();
    expect(planetNaboo).toBeInTheDocument();
    expect(planetCoruscant).toBeInTheDocument();
    expect(planetKamino).toBeInTheDocument();
  }, 40000);

  test('se ao digitar "o" a tabela lista 7 planetas ', async () => {
    const filterNameInput = screen.getByRole("textbox");
    userEvent.type(filterNameInput, "o");
    const namePlanets = await screen.findAllByTestId(/planet-name/);

    expect(namePlanets).toHaveLength(7);
  });

  test('se ao digitar "oo" a tabela lista 3 planetas ', async () => {
    const filterNameInput = screen.getByRole("textbox");
    userEvent.type(filterNameInput, "oo");
    const namePlanets = await screen.findAllByTestId(/planet-name/);

    expect(namePlanets).toHaveLength(2);
  });

  test("se ao filtrar por diameter maior que 9000, aparece o filtro na tela e 7 planetas e exclui filtro", async () => {
    const columnFilter = screen.getByTestId("column-filter");
    const diameter = screen.getByTestId("option-name-diameter");
    const comparisonFilter = await screen.getByTestId("comparison-filter");
    const numberInput = screen.getByRole("spinbutton");
    const filterButton = await screen.findByRole("button", { name: /filter/i });

    userEvent.click(columnFilter);
    userEvent.selectOptions(columnFilter, diameter);
    expect(diameter).toBeTruthy();
    userEvent.selectOptions(
      comparisonFilter,
      screen.getByRole("option", { name: "maior que" })
    );
    expect(screen.getByRole("option", { name: "maior que" })).toBeTruthy();
    userEvent.type(numberInput, "9000");
    userEvent.click(filterButton);

    // expect(await screen.findByRole(columnFilter, diameter).selected).toBe(true)
    const filterDiameter = await screen.getByText(/diameter maior que 09000/i);
    const namePlanets = await screen.findAllByTestId(/planet-name/);

    expect(filterDiameter).toBeInTheDocument();
    expect(namePlanets).toHaveLength(7);

    const excludeFilter = await screen.findByRole("button", {
      name: /excluir/i,
    });
    userEvent.click(excludeFilter);
    const newNamePlanets = await screen.findAllByTestId(/planet-name/);
    //expect(filterDiameter).!toBeInTheDocument()
    expect(newNamePlanets).toHaveLength(10);
  });

  // teste pegar 100%

  test('teste', async() => {
    const buttonFilter = await screen.findByTestId('button-filter');
    const valueFilter = screen.getByTestId('value-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine'));

    act(() => {
      fireEvent.change(valueFilter, { target: { value: '200000' } })
      fireEvent.click(buttonFilter);
    });

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Alderaan');

    const filterList = screen.getByTestId('filter');
    expect(filterList).toBeInTheDocument();

   /*  act(async () => {
      const filterRemove = await screen.findByTestId('remove-filter');
      fireEvent.click(filterRemove);
    }); */
    // const filterListr = await screen.findByTestId('filter');
    // expect(filterListr).not.toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    act(() => {
      userEvent.selectOptions(comparisonFilter, 'menor que');
      fireEvent.change(valueFilter, { target: { value: '364' } })
      fireEvent.click(buttonFilter);
    });
    const cont = await screen.findAllByTestId('planet-name')
    expect(cont[0]).toHaveTextContent('Naboo');

   /*  act(async () => {
      const filterRemove = await screen.findByTestId('remove-filter');
      fireEvent.click(filterRemove);  
    }); */

    act(() => {
      userEvent.selectOptions(comparisonFilter, 'igual a');
      fireEvent.change(valueFilter, { target: { value: '1000' } })
      fireEvent.click(buttonFilter);      
    });
/* const tatoo = await screen.findAllByTestId('planet-name')
    expect(tatoo[0]).toHaveTextContent('Naboo'); */
  }); 

  // finaly

  test("se é possivel ordenar corretamente a tabela", async () => {
    const asc = await screen.findByRole("radio", { name: /asc/i });
    const submit = await screen.findByRole("button", { name: /submit order/i });
    const columnSort = screen.getByTestId("column-sort");
    const optionRotation = screen.getByTestId("sort-rotation_period");

    userEvent.selectOptions(columnSort, optionRotation);
    expect(optionRotation).toBeTruthy();
    userEvent.click(asc);
    userEvent.click(submit);

// Desc --------------------------------------------------------------------------

    const desc = screen.getByText(/desc/i)
    const descSubmit = await screen.findByRole("button", { name: /submit order/i });
    const descColumnSort = screen.getByTestId("column-sort");
    const descOptionRotation = screen.getByTestId("sort-rotation_period");

    userEvent.selectOptions(descColumnSort, descOptionRotation);
    expect(descOptionRotation).toBeTruthy();
    userEvent.click(desc);
    userEvent.click(descSubmit);
  });


  // test pegar 100%

  test('Testa botão de ordenar', async () => {
    await waitFor(() => expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine'));
    const asc = await screen.findByRole("radio", { name: /asc/i });
    act(() => {
      fireEvent.click(asc);
    });

    const submitOrder = await screen.findByRole('button', {  name: /submit order/i})
    act(() => {
      fireEvent.click(submitOrder);
    });
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Yavin IV');

    const buttonDesc = screen.getByTestId('column-sort-input-desc');
    act(() => {
      fireEvent.click(buttonDesc);
      fireEvent.click(submitOrder);
    });
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Coruscant');
  });

  // finaly


  test("se é possivel remover todos os filtros", async () => {
    

    const diameter = screen.getByTestId("option-name-diameter");
    const columnFilter = await screen.findByTestId("column-filter");
    const comparisonFilter = await screen.getByTestId("comparison-filter");
    const numberInput = screen.getByRole("spinbutton");
    const filterButton = await screen.findByRole("button", { name: /filter/i });

    userEvent.click(columnFilter);
    userEvent.selectOptions(columnFilter, diameter);
    expect(diameter).toBeTruthy();
    userEvent.selectOptions(
      comparisonFilter,
      screen.getByRole("option", { name: "maior que" })
    );
    expect(screen.getByRole("option", { name: "maior que" })).toBeTruthy();
    userEvent.type(numberInput, "9000");
    userEvent.click(filterButton);

    // expect(await screen.findByRole(columnFilter, diameter).selected).toBe(true)
    const filterDiameter = await screen.getByText(/diameter maior que 09000/i);
    const namePlanets = await screen.findAllByTestId(/planet-name/);

    expect(filterDiameter).toBeInTheDocument();
    expect(namePlanets).toHaveLength(7);

    const excludeFilter = await screen.findByRole("button", {
      name: /excluir/i,
    });

    expect(excludeFilter).toBeInTheDocument()

    // new filter menor que -----------------------------------------------------


    const columnFilterMenor = screen.getByTestId("column-filter");
    const populationMenor = screen.getByTestId("option-name-population");
    const comparisonFilterMenor = await screen.getByTestId("comparison-filter");
    const numberInputMenor = screen.getByRole("spinbutton");
    const filterButtonMenor = await screen.findByRole("button", { name: /filter/i });

    userEvent.click(columnFilterMenor);
    userEvent.selectOptions(columnFilterMenor, populationMenor);
    expect(populationMenor).toBeTruthy();
    userEvent.selectOptions(
      comparisonFilterMenor,
      screen.getByRole("option", { name: "menor que" })
    );
    expect(screen.getByRole("option", { name: "menor que" })).toBeTruthy();
    userEvent.clear(numberInputMenor)
    userEvent.type(numberInputMenor, "1000000");
    userEvent.click(filterButtonMenor);

    // expect(await screen.findByRole(columnFilter, diameter).selected).toBe(true)
    const filterPop = await screen.getByText(/population menor que 1000000/i);
    const namePlanetsMenor = await screen.findAllByTestId(/planet-name/);

    expect(filterPop).toBeInTheDocument();
    expect(namePlanetsMenor).toHaveLength(2);

    const excludeFilterMenor = await screen.findAllByRole("button", {
      name: /excluir/i,
    });

    expect(excludeFilterMenor).toHaveLength(2)

    // new filter

    const newColumnFilter = screen.getByTestId("column-filter");
    const rotationPeriod = screen.getByTestId("option-name-rotation_period");
    const newComparisonFilter = await screen.getByTestId("comparison-filter");
    const newNumberInput = screen.getByRole("spinbutton");
    const newFilterButton = await screen.findByRole("button", { name: /filter/i });

    userEvent.click(newColumnFilter);
    userEvent.selectOptions(newColumnFilter, rotationPeriod);
    expect(rotationPeriod).toBeTruthy();
    userEvent.selectOptions(
      newComparisonFilter,
      screen.getByRole("option", { name: "igual a" })
    );
    expect(screen.getByRole("option", { name: "igual a" })).toBeTruthy();
    userEvent.clear(newNumberInput)
    userEvent.type(newNumberInput, '23');
    userEvent.click(newFilterButton);

    // expect(await screen.findByRole(columnFilter, diameter).selected).toBe(true)
    const newFilterRotation = await screen.getByText(/rotation_period igual a 23/i);
    const newNamePlanets = await screen.findAllByTestId(/planet-name/);

    expect(newFilterRotation).toBeInTheDocument();
    expect(newNamePlanets).toHaveLength(1);

    const newExcludeFilter = await screen.findAllByRole("button", {
      name: /excluir/i,
    });

    expect(newExcludeFilter).toHaveLength(3)
    const newNamePlanetsss = await screen.findAllByTestId(/planet-name/);
    expect(newNamePlanetsss).toHaveLength(1)

    const removeAllFiltersButton = await screen.findByRole("button", {
      name: /remover filtros/i,
    });

    userEvent.click(removeAllFiltersButton)

    const newNamePlanetss = await screen.findAllByTestId(/planet-name/);
    //expect(filterDiameter).!toBeInTheDocument()
    expect(newNamePlanetss).toHaveLength(10);
    
  });
});
