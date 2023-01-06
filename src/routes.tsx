import component_array_types from "./pages/array-types"
import component_auction from "./pages/auction"
import component_basic_types from "./pages/basic-types"
import component_constructor from "./pages/constructor"
import component_domain_types from "./pages/domain-types"
import component_for_loop from "./pages/for-loop"
import component_functions from "./pages/functions"
import component_hash_puzzle from "./pages/hash-puzzle"
import component_hello_world from "./pages/hello-world"
import component_methods from "./pages/methods"
import component_operators from "./pages/operators"
import component_p2pkh from "./pages/p2pkh"
import component_properties from "./pages/properties"
import component_return from "./pages/return"
import component_script_context from "./pages/script-context"
import component_user_defined_types from "./pages/user-defined-types"
import component_variable_declarations from "./pages/variable-declarations"
import component_ from "./pages"

interface Path {
  title: string
  path: string
}

interface Paths {
  prev: Path | null
  next: Path | null
}

interface Route {
  path: string
  component: React.FC<Paths>
  breakingChanges?: boolean
}

const routes: Route[] = [
    {
        path: "/array-types",
        component: component_array_types
    },
    {
        path: "/auction",
        component: component_auction
    },
    {
        path: "/basic-types",
        component: component_basic_types
    },
    {
        path: "/constructor",
        component: component_constructor
    },
    {
        path: "/domain-types",
        component: component_domain_types
    },
    {
        path: "/for-loop",
        component: component_for_loop
    },
    {
        path: "/functions",
        component: component_functions
    },
    {
        path: "/hash-puzzle",
        component: component_hash_puzzle
    },
    {
        path: "/hello-world",
        component: component_hello_world
    },
    {
        path: "/methods",
        component: component_methods
    },
    {
        path: "/operators",
        component: component_operators
    },
    {
        path: "/p2pkh",
        component: component_p2pkh
    },
    {
        path: "/properties",
        component: component_properties
    },
    {
        path: "/return",
        component: component_return
    },
    {
        path: "/script-context",
        component: component_script_context
    },
    {
        path: "/user-defined-types",
        component: component_user_defined_types
    },
    {
        path: "/variable-declarations",
        component: component_variable_declarations
    },
    {
        path: "",
        component: component_
    },
]

export default routes