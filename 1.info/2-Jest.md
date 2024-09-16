# Test unitarios con Jest

## Introducción. Usos de Jest

En esta unidad nos centraremos en los **test unitarios**, que son como hemos visto, pruebas que se realizan sobre unidades de código, como funciones o clases, de forma aislada. Los test unitarios nos permiten verificar que cada unidad de código funciona correctamente de forma independiente.

De las distintas herramientas de testing ya mencionadas, vamos a utilizar **Jest**, un framework de testing desarrollado por Facebook que nos permite escribir y ejecutar test unitarios tanto para el **backend** desarrollado con Node como para el **frontend**, basado en VanillaJS o en React. Como framework de testing, Jest nos proporciona una serie de utilidades que nos permiten escribir y ejecutar test unitarios de forma sencilla y eficiente, incluyendo herramientas para la creación de **mocks** y **spies**, la realización de pruebas asíncronas basadas en **promesas** y **async/await** o que utilizan **timers**, y la creación y ejecución de pruebas de **snapshot**, etc.

Además de su uso en pruebas unitarias, Jest puede combinarse con otras herramientas para realizar pruebas de integración, pruebas de componentes, pruebas de aceptación.

- junto con [SuperTest](https://www.npmjs.com/package/supertest) permite realizar **pruebas end-to-end de API** desarrolladas en Node.
- junto con [Testing Library](https://testing-library.com/) permite realizar **pruebas de componentes** en aplicaciones web con VanillaJS o con diversos Frameworks, incluyendo **React**.

Otras posibilidades que recoge la propia documentación de Jest, son utilizarlo junto con [Puppeteer](https://pptr.dev/) para realizar **pruebas de navegación (end-to-end)** en aplicaciones web o emplearlo para llevar a cabo pruebas de bases de datos No-SQL como [MongoDB](https://www.mongodb.com/) y [DynamoDB](https://aws.amazon.com/es/dynamodb/).

## Instalación y configuración de Jest

Partimos de la base de que ya tenemos instalado NodeJS y NPM en nuestro sistema. Si no es así, puedes seguir las instrucciones de la [documentación oficial de NodeJS](https://nodejs.org/es/download/). Puedes comprobar la correcta instalación de NodeJS y NPM ejecutando los siguientes comandos en la terminal:

```sh
node -v
npm -v
```

Igualmente vamos a partir de la base de que ya tenemos un proyecto en el que vamos a instalar Jest. Si no es así, puedes crear un proyecto nuevo con el siguiente comando:

```sh
npm init -y
```

Si nuestro proyecto va a utilizar ESModules, debemos añadir la siguiente configuración en el archivo `package.json`:

```json
{
  "type": "module"
}
```

Para instalar Jest en el proyecto, lo primero que debemos hacer es añadirlo como dependencia de desarrollo, ejecutando el siguiente comando en la terminal:

```sh
npm install -D jest @types/jest
```

Al añadir los tipos de Jest, que necesitaríamos para escribir los test unitarios en TypeScript, le damos a VSC la información necesaria para que nos muestre los matchers de Jest en el autocompletado.

En algunos casos, además de haber instalado @types/jest, es necesario configurar el fichero jsconfig.json

```json
{
  "typeAcquisition": {
    "include": ["jest"]
  }
}
```

### Configuración. Uso de módulos ES

Jest no soporta **módulos ES**, por lo que no podemos escribir nuestros test unitarios importando en ese formato las funciones o clases que queremos testar.
La alternativa propuesta por la documentación de Jest es hacer algunos cambios en la configuración del proyecto para que Jest pueda interpretar los módulos ES, pero ello conlleva ciertas limitaciones a la hora de crear mocks de los módulos.

Otra alternativa es utilizar un **transpilador** como **Babel**, que convierta los módulos ES a CommonJS. En general esto supondría instalar el paquete `@babel/core` y el preset `@babel/preset-env` como dependencias de desarrollo, pero si solo se necesita la transpilación en los tests, es suficiente con instalar el paquete `@babel/plugin-transform-modules-commonjs` como dependencia de desarrollo:

```sh
npm i -D @babel/plugin-transform-modules-commonjs
```

Para que esté plugin funcione, es necesario configurar Babel en el fichero package.json

```json
  "babel": {
    "env": {
      "test": {
        "plugins": [
          "@babel/plugin-transform-modules-commonjs"
        ]
      }
    }
  }
```

### Configuración. ESLint. Uso de TypeScript

Si hemos añadido al proyecto ESLint, el linter de JavaScript, para que ESLint no de errores con las funciones de Jest, necesita indicar que Jest es un entorno de ejecución, añadiendo la propiedad `jest` al objeto `env` en la configuración de ESLint, que puede estar en el fichero `package.json` o en el fichero `.eslintrc.json`:

```json
{
  "env": {
    ...
    "jest": true
  },
  ...
}
```

Si nuestro proyecto está desarrollado en TypeScript, además de instalar Jest y los tipos de Jest como dependencias de desarrollo, añadiremos la instalación de `ts-jest` y `jest-ts-webcompat-resolver`, este último para resolver los módulos ES en Jest, por lo que dejará de ser necesario el plugin de Babel. Si ademas queremos la importación de módulos CSS o SCSS, añadiremos `identity-obj-proxy` como dependencia de desarrollo.

```bash
  npm i -D jest ts-jest @types/jest
  npm i -D jest-ts-webcompat-resolver
  npm i -D identity-obj-proxy
```

Finalmente hay que añadir un archivo de configuración `jest.config.js` en la raíz del proyecto:

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  // testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["dist"],
  resolver: "jest-ts-webcompat-resolver",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
```

### Scripts de ejecución de los tests unitarios

Si observamos el fichero `package.json`, veremos que en la sección `scripts` hay un script de test que se ejecuta al ejecutar el comando `npm test`.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Este script por defecto muestra el mensaje indicado y simula un fallo en los test al terminar con un código 1 (error), a nivel de sistema operativo. Jest, actúa de igual manera, termina con un código 0 (éxito) si todos los test pasan y con un código 1 si alguno falla, lo cual permite integrar los test en cualquier proceso automático como los que se utilizan en CI/CD.

Para ejecutar Jest, debemos modificar el script de test para que ejecute Jest con el conjunto de parámetros que nos interese, por ejemplo `coverage`. Además, podemos añadir otros scripts que nos permitan ejecutar Jest en modo `watch`, muy habitual para desarrollo, o en modo `watchAll`, que ejecuta todos los test cada vez que se modifica un archivo.

```json
  "scripts": {
    "test": "jest --coverage",
    "test:dev": "jest --watchAll",
  },
```

Cualquiera que sea el script que definamos,lo ejecutaremos en la terminal con el comando `npm run test` o `npm test` (para el comando test no hace falta usar 'run'), o con el comando `npm run test:dev`. En ambos casos, Jest buscará los test en la carpeta `__tests__` o en los archivos que tengan el sufijo `.test.js` o `.spec.js`.

Los comandos de Jest, además de las opciones que nos permiten personalizar la ejecución de los test, como por ejemplo `--coverage` o `--watch` , pueden terminar con una cadena de caracteres que se interpreta como una expresión regular que filtre los test que se van a ejecutar. Por ejemplo, si queremos ejecutar solo los test que contienen la palabra `utils` en el nombre, ejecutaríamos el siguiente comando:

```sh
npm test utils
npm run test:dev utils
```
## npx jest --help
Options:
  -h, --help                        Show help                          [boolean]
      --version                     Show version number                [boolean]
      --all                         The opposite of `onlyChanged`. If
                                    `onlyChanged` is set by default, running
                                    jest with `--all` will force Jest to run all
                                    tests instead of running only tests related
                                    to changed files.                  [boolean]
      --automock                    Automock all files by default.     [boolean]
  -b, --bail                        Exit the test suite immediately after `n`
                                    number of failing tests.           [boolean]
      --cache                       Whether to use the transform cache. Disable
                                    the cache using --no-cache.        [boolean]
      --cacheDirectory              The directory where Jest should store its
                                    cached  dependency information.     [string]
      --changedFilesWithAncestor    Runs tests related to the current changes
                                    and the changes made in the last commit.
                                    Behaves similarly to `--onlyChanged`.
                                                                       [boolean]
      --changedSince                Runs tests related to the changes since the
                                    provided branch. If the current branch has
                                    diverged from the given branch, then only
                                    changes made locally will be tested. Behaves
                                    similarly to `--onlyChanged`.       [string]
      --ci                          Whether to run Jest in continuous
                                    integration (CI) mode. This option is on by
                                    default in most popular CI environments. It
                                    will prevent snapshots from being written
                                    unless explicitly requested.       [boolean]
      --clearCache                  Clears the configured Jest cache directory
                                    and then exits. Default directory can be
                                    found by calling jest --showConfig [boolean]
      --clearMocks                  Automatically clear mock calls, instances,
                                    contexts and results before every test.
                                    Equivalent to calling jest.clearAllMocks()
                                    before each test.                  [boolean]
      --collectCoverage             Alias for --coverage.              [boolean]
      --collectCoverageFrom         A glob pattern relative to <rootDir>
                                    matching the files that coverage info needs
                                    to be collected from.               [string]
      --color                       Forces test results output color
                                    highlighting (even if stdout is not a TTY).
                                    Set to false if you would like to have no
                                    colors.                            [boolean]
      --colors                      Alias for `--color`.               [boolean]
  -c, --config                      The path to a jest config file specifying
                                    how to find and execute tests. If no rootDir
                                    is set in the config, the directory
                                    containing the config file is assumed to be
                                    the rootDir for the project. This can also
                                    be a JSON encoded value which Jest will use
                                    as configuration.                   [string]
      --coverage                    Indicates that test coverage information
                                    should be collected and reported in the
                                    output.                            [boolean]
      --coverageDirectory           The directory where Jest should output its
                                    coverage files.                     [string]
      --coveragePathIgnorePatterns  An array of regexp pattern strings that are
                                    matched against all file paths before
                                    executing the test. If the file path matches
                                    any of the patterns, coverage information
                                    will be skipped.                     [array]
      --coverageProvider            Select between Babel and V8 to collect
                                    coverage            [choices: "babel", "v8"]
      --coverageReporters           A list of reporter names that Jest uses when
                                    writing coverage reports. Any istanbul
                                    reporter can be used.                [array]
      --coverageThreshold           A JSON string with which will be used to
                                    configure minimum threshold enforcement for
                                    coverage results                    [string]
      --debug                       Print debugging info about your jest config.
                                                                       [boolean]
      --detectLeaks                 **EXPERIMENTAL**: Detect memory leaks in
                                    tests. After executing a test, it will try
                                    to garbage collect the global object used,
                                    and fail if it was leaked          [boolean]
      --detectOpenHandles           Print out remaining open handles preventing
                                    Jest from exiting at the end of a test run.
                                    Implies `runInBand`.               [boolean]
      --env                         The test environment used for all tests.
                                    This can point to any file or node module.
                                    Examples: `jsdom`, `node` or
                                    `path/to/my-environment.js`         [string]
      --errorOnDeprecated           Make calling deprecated APIs throw helpful
                                    error messages.                    [boolean]
  -e, --expand                      Use this flag to show full diffs instead of
                                    a patch.                           [boolean]
      --filter                      Path to a module exporting a filtering
                                    function. This method receives a list of
                                    tests which can be manipulated to exclude
                                    tests from running. Especially useful when
                                    used in conjunction with a testing
                                    infrastructure to filter known broken tests.
                                                                        [string]
      --findRelatedTests            Find related tests for a list of source
                                    files that were passed in as arguments.
                                    Useful for pre-commit hook integration to
                                    run the minimal amount of tests necessary.
                                                                       [boolean]
      --forceExit                   Force Jest to exit after all tests have
                                    completed running. This is useful when
                                    resources set up by test code cannot be
                                    adequately cleaned up.             [boolean]
      --globalSetup                 The path to a module that runs before All
                                    Tests.                              [string]
      --globalTeardown              The path to a module that runs after All
                                    Tests.                              [string]
      --globals                     A JSON string with map of global variables
                                    that need to be available in all test
                                    environments.                       [string]
      --haste                       A JSON string with map of variables for the
                                    haste module system                 [string]
      --ignoreProjects              Ignore the tests of the specified projects.
                                    Jest uses the attribute `displayName` in the
                                    configuration to identify each project.
                                                                         [array]
      --init                        Generate a basic configuration file[boolean]
      --injectGlobals               Should Jest inject global variables or not
                                                                       [boolean]
      --json                        Prints the test results in JSON. This mode
                                    will send all other test output and user
                                    messages to stderr.                [boolean]
      --lastCommit                  Run all tests affected by file changes in
                                    the last commit made. Behaves similarly to
                                    `--onlyChanged`.                   [boolean]
      --listTests                   Lists all tests Jest will run given the
                                    arguments and exits. Most useful in a CI
                                    system together with `--findRelatedTests` to
                                    determine the tests Jest will run based on
                                    specific files                     [boolean]
      --logHeapUsage                Logs the heap usage after every test. Useful
                                    to debug memory leaks. Use together with
                                    `--runInBand` and `--expose-gc` in node.
                                                                       [boolean]
      --maxConcurrency              Specifies the maximum number of tests that
                                    are allowed to run concurrently. This only
                                    affects tests using `test.concurrent`.
                                                                        [number]
  -w, --maxWorkers                  Specifies the maximum number of workers the
                                    worker-pool will spawn for running tests.
                                    This defaults to the number of the cores
                                    available on your machine. (its usually best
                                    not to override this default)       [string]
      --moduleDirectories           An array of directory names to be searched
                                    recursively up from the requiring module's
                                    location.                            [array]
      --moduleFileExtensions        An array of file extensions your modules
                                    use. If you require modules without
                                    specifying a file extension, these are the
                                    extensions Jest will look for.       [array]
      --moduleNameMapper            A JSON string with a map from regular
                                    expressions to module names or to arrays of
                                    module names that allow to stub out
                                    resources, like images or styles with a
                                    single module                       [string]
      --modulePathIgnorePatterns    An array of regexp pattern strings that are
                                    matched against all module paths before
                                    those paths are to be considered "visible"
                                    to the module loader.                [array]
      --modulePaths                 An alternative API to setting the NODE_PATH
                                    env variable, modulePaths is an array of
                                    absolute paths to additional locations to
                                    search when resolving modules.       [array]
      --noStackTrace                Disables stack trace in test results output
                                                                       [boolean]
      --notify                      Activates notifications for test results.
                                                                       [boolean]
      --notifyMode                  Specifies when notifications will appear for
                                    test results.                       [string]
  -o, --onlyChanged                 Attempts to identify which tests to run
                                    based on which files have changed in the
                                    current repository. Only works if you're
                                    running tests in a git or hg repository at
                                    the moment.                        [boolean]
  -f, --onlyFailures                Run tests that failed in the previous
                                    execution.                         [boolean]
      --openHandlesTimeout          Print a warning about probable open handles
                                    if Jest does not exit cleanly after this
                                    number of milliseconds. `0` to disable.
                                                                        [number]
      --outputFile                  Write test results to a file when the --json
                                    option is also specified.           [string]
      --passWithNoTests             Will not fail if no tests are found (for
                                    example while using `--testPathPattern`.)
                                                                       [boolean]
      --preset                      A preset that is used as a base for Jest's
                                    configuration.                      [string]
      --prettierPath                The path to the "prettier" module used for
                                    inline snapshots.                   [string]
      --projects                    A list of projects that use Jest to run all
                                    tests of all projects in a single instance
                                    of Jest.                             [array]
      --randomize                   Shuffle the order of the tests within a
                                    file. In order to choose the seed refer to
                                    the `--seed` CLI option.           [boolean]
      --reporters                   A list of custom reporters for the test
                                    suite.                               [array]
      --resetMocks                  Automatically reset mock state before every
                                    test. Equivalent to calling
                                    jest.resetAllMocks() before each test.
                                                                       [boolean]
      --resetModules                If enabled, the module registry for every
                                    test file will be reset before running each
                                    individual test.                   [boolean]
      --resolver                    A JSON string which allows the use of a
                                    custom resolver.                    [string]
      --restoreMocks                Automatically restore mock state and
                                    implementation before every test. Equivalent
                                    to calling jest.restoreAllMocks() before
                                    each test.                         [boolean]
      --rootDir                     The root directory that Jest should scan for
                                    tests and modules within.           [string]
      --roots                       A list of paths to directories that Jest
                                    should use to search for files in.   [array]
  -i, --runInBand                   Run all tests serially in the current
                                    process (rather than creating a worker pool
                                    of child processes that run tests). This is
                                    sometimes useful for debugging, but such use
                                    cases are pretty rare.             [boolean]
      --runTestsByPath              Used when provided patterns are exact file
                                    paths. This avoids converting them into a
                                    regular expression and matching it against
                                    every single file.                 [boolean]
      --runner                      Allows to use a custom runner instead of
                                    Jest's default test runner.         [string]
      --seed                        Sets a seed value that can be retrieved in a
                                    tests file via `jest.getSeed()`. If this
                                    option is not specified Jest will randomly
                                    generate the value. The seed value must be
                                    between `-0x80000000` and `0x7fffffff`
                                    inclusive.                          [number]
      --selectProjects              Run the tests of the specified projects.
                                    Jest uses the attribute `displayName` in the
                                    configuration to identify each project.
                                                                         [array]
      --setupFiles                  A list of paths to modules that run some
                                    code to configure or set up the testing
                                    environment before each test.        [array]
      --setupFilesAfterEnv          A list of paths to modules that run some
                                    code to configure or set up the testing
                                    framework before each test           [array]
      --shard                       Shard tests and execute only the selected
                                    shard, specify in the form "current/all".
                                    1-based, for example "3/5".         [string]
      --showConfig                  Print your jest config and then exits.
                                                                       [boolean]
      --showSeed                    Prints the seed value in the test report
                                    summary. See `--seed` for how to set this
                                    value                              [boolean]
      --silent                      Prevent tests from printing messages through
                                    the console.                       [boolean]
      --skipFilter                  Disables the filter provided by --filter.
                                    Useful for CI jobs, or local enforcement
                                    when fixing tests.                 [boolean]
      --snapshotSerializers         A list of paths to snapshot serializer
                                    modules Jest should use for snapshot
                                    testing.                             [array]
      --testEnvironment             Alias for --env                     [string]
      --testEnvironmentOptions      A JSON string with options that will be
                                    passed to the `testEnvironment`. The
                                    relevant options depend on the environment.
                                                                        [string]
      --testFailureExitCode         Exit code of `jest` command if the test run
                                    failed                              [string]
      --testLocationInResults       Add `location` information to the test
                                    results                            [boolean]
      --testMatch                   The glob patterns Jest uses to detect test
                                    files.                               [array]
  -t, --testNamePattern             Run only tests with a name that matches the
                                    regex pattern.                      [string]
      --testPathIgnorePatterns      An array of regexp pattern strings that are
                                    matched against all test paths before
                                    executing the test. If the test path matches
                                    any of the patterns, it will be skipped.
                                                                         [array]
      --testPathPattern             A regexp pattern string that is matched
                                    against all tests paths before executing the
                                    test.                                [array]
      --testRegex                   A string or array of string regexp patterns
                                    that Jest uses to detect test files. [array]
      --testResultsProcessor        Allows the use of a custom results
                                    processor. This processor must be a node
                                    module that exports a function expecting as
                                    the first argument the result object.
                                                                        [string]
      --testRunner                  Allows to specify a custom test runner. The
                                    default is `jest-circus/runner`. A path to a
                                    custom test runner can be provided:
                                    `<rootDir>/path/to/testRunner.js`.  [string]
      --testSequencer               Allows to specify a custom test sequencer.
                                    The default is `@jest/test-sequencer`. A
                                    path to a custom test sequencer can be
                                    provided:
                                    `<rootDir>/path/to/testSequencer.js`[string]
      --testTimeout                 This option sets the default timeouts of
                                    test cases.                         [number]
      --transform                   A JSON string which maps from regular
                                    expressions to paths to transformers.
                                                                        [string]
      --transformIgnorePatterns     An array of regexp pattern strings that are
                                    matched against all source file paths before
                                    transformation.                      [array]
      --unmockedModulePathPatterns  An array of regexp pattern strings that are
                                    matched against all modules before the
                                    module loader will automatically return a
                                    mock for them.                       [array]
  -u, --updateSnapshot              Use this flag to re-record snapshots. Can be
                                    used together with a test suite pattern or
                                    with `--testNamePattern` to re-record
                                    snapshot for test matching the pattern
                                                                       [boolean]
      --useStderr                   Divert all output to stderr.       [boolean]
      --verbose                     Display individual test results with the
                                    test suite hierarchy.              [boolean]
      --watch                       Watch files for changes and rerun tests
                                    related to changed files. If you want to
                                    re-run all tests when a file has changed,
                                    use the `--watchAll` option.       [boolean]
      --watchAll                    Watch files for changes and rerun all tests.
                                    If you want to re-run only the tests related
                                    to the changed files, use the `--watch`
                                    option.                            [boolean]
      --watchPathIgnorePatterns     An array of regexp pattern strings that are
                                    matched against all paths before trigger
                                    test re-run in watch mode. If the test path
                                    matches any of the patterns, it will be
                                    skipped.                             [array]
      --watchman                    Whether to use watchman for file crawling.
                                    Disable using --no-watchman.       [boolean]
      --workerThreads               Whether to use worker threads for
                                    parallelization. Child processes are used by
                                    default.                           [boolean]
 

## Estructura de los test unitarios con Jest

La estructura de los ficheros de test creados con Jest se corresponde con la que describíamos en la unidad anterior al referirnos a los test unitarios.
Cada fichero de test se encarga de verificar el correcto funcionamiento de una unidad de código, como una función o una clase, de forma aislada.

- Los test unitarios se agrupan en **test suites** que se definen con la función `describe`.
- Cada test unitario se corresponde con una función que se define con la palabra `it` o `test`, que representa un caso de prueba concreto de una función o un método de una clase
- Las aserciones se realizan con la función `expect` de Jest, que se encarga de comparar el valor esperado con el valor obtenido.
- La forma en que se lleva a cabo dicha comparación depende del matcher empleado: una función booleana que se encarga de comparar el valor esperado con el valor obtenido. Una de las funciones más comunes para realizar aserciones es la función `toBe`.

Veamos el ejemplo con la función `product` que multiplica dos números:

```js
// product.js
export function product(a, b) {
  return a + b;
}
```

```js
// product.test.js
import { prod } from "./prod";
describe("prod", () => {
  it("should return the prod of two numbers", () => {
    expect(product(1, 2)).toBe(3);
  });
});
```

Como hemos visto, la organización del código puede seguir distintos patrones, como el **patrón AAA** (Arrange, Act, Assert) o el **patrón Given-When-Then**.

El ejemplo anterior utilizando el patrón AAA sería:

```js
// product.test.js
import { prod } from "./prod";

describe("prod", () => {
  it("should return the prod of two numbers", () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;
    // Act
    const result = product(a, b);
    // Assert
    expect(result).toBe(expected);
  });
});
```

El mismo ejemplo utilizando el patrón Given-When-Then y diversos niveles de describe sería:

```js
// product.test.js
import { prod } from "./prod";
describe("Given product function", () => {
  describe("when we multiply two numbers, 2 and 3", () => {
    const a = 2;
    const b = 3;
    it("should return 6", () => {
      const expected = 6;
      const result = product(a, b);
      expect(result).toBe(expected);
    });
  });
});
```

En este caso, el patron Given-When-Then añade un nivel de abstracción a los test, que se corresponden con las distintas partes de la función que se está testando. Como cualquier abstracción, puede suponer mayor cantidad de código, pero también mayor claridad en la estructura de los test que se refleja cuando vemos la salida de los test en la terminal.

```sh
  Given product function
    when we multiply two numbers, 2 and 3
      √ should return 6
```

El uso de estos patrones puede cobrar mayor sentido en función de la complejidad del conjunto de test que se estén realizando, y de la cantidad de test que se estén realizando.

## Matchers de Jest

Jest proporciona una serie de funciones que nos permiten realizar aserciones en los test unitarios. Estas funciones se conocen como **matchers** y se utilizan para comparar el valor esperado con el valor obtenido en el test.

### Igualdad y veracidad

En este apartado se incluyen algunos de los matchers más comunes:

- `toBe`: Compara si dos valores son iguales utilizando el operador `===`. Solo debe usarse para comparar valores primitivos.
- `toEqual`: Compara si dos valores son iguales utilizando el algoritmo de comparación de objetos de JavaScript. Se utiliza para comparar objetos y arrays.
- `toBeNull`: Comprueba si un valor es `null`.
- `toBeUndefined`: Comprueba si un valor es `undefined`.
- `toBeDefined`: Comprueba si un valor está definido.
- `toBeTruthy`: Comprueba si un valor es verdadero, es decir, hace casting a true.
- `toBeFalsy`: Comprueba si un valor es falso, es decir hace casting a false.

Ejemplo de uso de matchers de igualdad y veracidad

```js
describe("Matchers de igualdad y veracidad", () => {
  it("toBe", () => {
    expect(1 + 2).toBe(3);
  });
  it("toEqual", () => {
    expect({ a: 1 }).toEqual({ a: 1 });
  });
  it("toBeNull", () => {
    expect(null).toBeNull(); // === toBe(null)
  });
  it("toBeUndefined", () => {
    expect(undefined).toBeUndefined();
  });
  it("toBeDefined", () => {
    expect(1).toBeDefined();
  });
  it("toBeTruthy", () => {
    expect(true).toBeTruthy();
  });
  it("toBeFalsy", () => {
    expect(false).toBeFalsy(); 
  });
});
```

### Comparación de números

Entre los matchers específicos para valores de tipo number encontramos:

- `toBeGreaterThan`: Comprueba si un valor es mayor que otro.
- `toBeGreaterThanOrEqual`: Comprueba si un valor es mayor o igual que otro.
- `toBeLessThan`: Comprueba si un valor es menor que otro.
- `toBeLessThanOrEqual`: Comprueba si un valor es menor o igual que otro.
- `toBeCloseTo`: Comprueba si un valor es cercano a otro, con un margen de error.

Ejemplo de uso de matchers de comparación de números

```js
describe("Matchers de comparación de números", () => {
  it("toBeGreaterThan", () => {
    expect(3).toBeGreaterThan(2);
  });
  it("toBeGreaterThanOrEqual", () => {
    expect(3).toBeGreaterThanOrEqual(3);
  });
  it("toBeLessThan", () => {
    expect(2).toBeLessThan(3);
  });
  it("toBeLessThanOrEqual", () => {
    expect(2).toBeLessThanOrEqual(2);
  });
  it("toBeCloseTo", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});
```

### Comparación de otros tipos de valores

Otros matchers disponibles par otros tipos de valores son:

- `toBeInstanceOf`: Comprueba si un valor es una instancia de una clase.
- `toMatch`: Comprueba si un valor coincide con una expresión regular.
- `toContain`: Comprueba si un valor contiene otro valor. Puede utilizarse con arrays y strings.
- `toHaveLength`: Comprueba si un valor tiene una longitud determinada. Puede utilizarse con arrays y strings.

Ejemplo de uso de matchers de comparación de otros tipos de valores

```js
describe("Matchers de comparación de otros tipos de valores", () => {
  it("toBeInstanceOf", () => {
    expect(new Date()).toBeInstanceOf(Date);
  });
  it("toMatch", () => {
    expect("abc").toMatch(/a/);
  });
  it("toContain", () => {
    expect([1, 2, 3]).toContain(2);
  });
  it("toHaveLength", () => {
    expect("abc").toHaveLength(3);
  });
});
```

### Excepciones y errores

El matchers para errores es

- `toThrow`: Comprueba si una función lanza una excepción.

Su variante `toThrowError` comprobaba si una función lanza una excepción con un mensaje determinado, pero ha sido deprecado en Jest 24.9.0.

En caso de los test de snapshot, Jest proporciona los siguientes matchers para errores:

- `toThrowErrorMatchingSnapshot`: Comprueba si una función lanza una excepción que coincide con un snapshot.
- `toThrowErrorMatchingInlineSnapshot`: Comprueba si una función lanza una excepción que coincide con un snapshot en línea.

Algunos ejemplos de uso de matchers para errores:

```js
const throwError = () => {
  throw new Error("Error");
};

function makePossibleError(n) {
  if (n > 1) {
    throw new Error("Error");
  }
}
describe("Matchers de errores", () => {
  it("toThrow", () => {
    expect(throwError).toThrow();
  });
  it("toThrow", () => {
    expect(() => makePossibleError(2)).toThrow();
  });
});
```

En los test de casos en las que una función lanzan un error, esta se pasa como **callback** al expect, para que Jest pueda capturar la excepción y comprobar si se ha lanzado. En el caso de la función `makePossibleError`, que necesita un argumento, se pasa como callback una función anónima que llama a `makePossibleError` con el argumento 2.

## Ejercicios

1. Crea una función `isEven` que recibe un número entero positivo y devuelve `true` si es par y `false` en caso contrario. Crea los test unitarios para la función `isEven` siguiendo la metodología TDD.
2. Crea una función `isPrime` que recibe un número entero positivo y devuelve `true` si es un número primo y `false` en caso contrario. Crea los test unitarios para la función `isPrime` siguiendo la metodología TDD.
3. Crea una función `fibonacci` que recibe un número entero positivo y devuelve el número de la serie de Fibonacci correspondiente. Crea los test unitarios para la función `fibonacci` siguiendo la metodología TDD.
4. Crea una función `isPalindrome` que recibe una cadena de texto y devuelve `true` si es un palíndromo y `false` en caso contrario. Crea los test unitarios para la función `isPalindrome` siguiendo la metodología TDD.
5. Función de ordenación usando TDD: Crea una función `sort` que recibe un array de números y devuelve un array con los números ordenados de menor a mayor. Crea los test unitarios para la función `sort` siguiendo la metodología TDD.

Para el caso de los array, podemos llevar a cabo un completo conjunto de ejercicios, creando un modulo con funciones que repliquen los siguientes métodos de array, sin utilizar ninguno de los métodos o propiedades ya existentes en el prototipo de Array:

- length,
- push,
- pop (puede usar length),
- unshift,
- shift (puede usar length),
- some,
- every,
- find,
- filter,
- map,
- findIndex,
- includes,
- indexOf,
- reduce,
- join

Cualquiera de tus funciones puede usar las que ya hayas creado. Crea los test unitarios para cada una de las funciones siguiendo la metodología TDD.

## Referencias

VIDEO: [Introducción al Testing desde Cero con JEST](https://www.youtube.com/watch?v=_DzBez4qMi0) por Midudev

VIDEO: [Introduction To Testing In JavaScript With Jest](https://www.youtube.com/watch?v=FgnxcUQ5vho) by Web Dev Simplified

- [Jest](https://jestjs.io/)
- [Test unitarios en Node.js con Jest](https://medium.com/@diego.coder/test-unitarios-en-javascript-con-jest-4f120f5e7124) por diego.coder26 (2022)
- [Jest Testing: A Helpful, Introductory Tutorial](https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/) by Testim (2022)



