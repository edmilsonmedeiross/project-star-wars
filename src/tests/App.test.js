import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import testData from "../../cypress/mocks/testData";

const spyFetch = jest.spyOn(global, "fetch");

describe("testes do App.JSX", () => {
  beforeEach(() => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(<App />);
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

  test("se ao filtrar por diameter maior que 9000, aparece o filtro na tela e 7 planetas", async () => {
    const columnFilter = screen.getByTestId("column-filter");
    const diameter = screen.getByTestId("option-name-diameter");
    const comparisonFilter = await screen.getByTestId("comparison-filter");
    const numberInput = screen.getByRole("spinbutton");
    const filterButton = await screen.findByRole("button", { name: /filter/i });

    userEvent.click(columnFilter)
    userEvent.selectOptions(columnFilter, diameter);
    expect(diameter).toBeTruthy()
    userEvent.selectOptions(comparisonFilter, screen.getByRole('option', {name: 'maior que'}));
    expect(screen.getByRole('option', {name: 'maior que'})).toBeTruthy()
    userEvent.type(numberInput, '9000')
    userEvent.click(filterButton)

    // expect(await screen.findByRole(columnFilter, diameter).selected).toBe(true)
    const filterDiameter = await screen.getByText(/diameter maior que 09000/i)
    const namePlanets = await screen.findAllByTestId(/planet-name/)

    expect(filterDiameter).toBeInTheDocument()
    expect(namePlanets).toHaveLength(7)
  });
});
