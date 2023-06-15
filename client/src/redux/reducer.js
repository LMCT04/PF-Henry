import { ORDER_AlPHABETIC,ORDER_PRICE, FILTER_CATEGORY, FILTER_TYPE } from "./actionsType/productsAT";

const initialState={
    products: [
        {
          name: "Amaya",
          image: "https://spoonacular.com/recipeImages/715497-312x231.jpgbbc.co.uk",
          description:
            "In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas",
          price: "€20",
          type: "sin lactosa",
          category: "solido",
        },
        {
          name: "Austin",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgtwitter.com",
          description:
            "euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas",
          price: "€28",
          type: "vegano",
          category: "liquido",
        },
        {
          name: "Hasad",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpginstagram.com",
          description: "Sed nunc est, mollis non, cursus non, egestas a, dui.",
          price: "€14",
          type: "sin lactosa",
          category: "solido",
        },
        {
          name: "Sawyer",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgyoutube.com",
          description:
            "eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed",
          price: "€12",
          type: "sin lactosa",
          category: "liquido",
        },
        {
          name: "Cherokee",
          image: "https://spoonacular.com/recipeImages/715497-312x231.jpgbbc.co.uk",
          description:
            "ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus.",
          price: "€12",
          type: "sin gluten",
          category: "solido",
        },
        {
          name: "Wade",
          image: "https://spoonacular.com/recipeImages/715497-312x231.jpgbbc.co.uk",
          description:
            "velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod",
          price: "€17",
          type: "sin gluten",
          category: "solido",
        },
        {
          name: "Yvette",
          image: "https://spoonacular.com/recipeImages/715497-312x231.jpgcnn.com",
          description: "diam vel arcu. Curabitur ut odio vel est tempor bibendum.",
          price: "€21",
          type: "sin gluten",
          category: "liquido",
        },
        {
          name: "Vaughan",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpginstagram.com",
          description:
            "Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum.",
          price: "€26",
          type: "sin lactosa",
          category: "liquido",
        },
        {
          name: "Anthony",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
          description:
            "metus eu erat semper rutrum. Fusce dolor quam, elementum at,",
          price: "€13",
          type: "vegano",
          category: "liquido",
        },
        {
          name: "Rose",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgwhatsapp.com",
          description:
            "placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl.",
          price: "€37",
          type: "sin gluten",
          category: "solido",
        },
        {
          name: "Nina",
          image: "https://spoonacular.com/recipeImages/715497-312x231.jpgnaver.com",
          description:
            "sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo.",
          price: "€13",
          type: "sin lactosa",
          category: "solido",
        },
        {
          name: "Noble",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgwhatsapp.com",
          description:
            "libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet",
          price: "€31",
          type: "sin gluten",
          category: "solido",
        },
        {
          name: "Emmanuel",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
          description:
            "sed turpis nec mauris blandit mattis. Cras eget nisi dictum",
          price: "€17",
          type: "sin lactosa",
          category: "liquido",
        },
        {
          name: "Justin",
          image: "https://spoonacular.com/recipeImages/715497-312x231.jpgcnn.com",
          description:
            "adipiscing, enim mi tempor lorem, eget mollis lectus pede et",
          price: "€24",
          type: "sin gluten",
          category: "solido",
        },
        {
          name: "Gray",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgreddit.com",
          description: "Donec est mauris, rhoncus id, mollis nec, cursus a, enim.",
          price: "€23",
          type: "vegano",
          category: "liquido",
        },
        {
          name: "Macaulay",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgnytimes.com",
          description:
            "lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus",
          price: "€36",
          type: "sin gluten",
          category: "solido",
        },
        {
          name: "Burton",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpggoogle.com",
          description: "tortor at risus. Nunc ac sem ut dolor dapibus gravida.",
          price: "€18",
          type: "vegano",
          category: "solido",
        },
        {
          name: "Zena",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgwikipedia.org",
          description:
            "cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut",
          price: "€39",
          type: "vegano",
          category: "liquido",
        },
        {
          name: "Illiana",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpggoogle.com",
          description:
            "Aenean sed pede nec ante blandit viverra. Donec tempus, lorem",
          price: "€12",
          type: "vegano",
          category: "liquido",
        },
        {
          name: "Thaddeus",
          image:
            "https://spoonacular.com/recipeImages/715497-312x231.jpgfacebook.com",
          description:
            "congue a, aliquet vel, vulputate eu, odio. Phasellus at augue",
          price: "€17",
          type: "sin lactosa",
          category: "liquido",
        },],
    allProducts: [{
      name: "Amaya",
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpgbbc.co.uk",
      description:
        "In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas",
      price: "€20",
      type: "sin lactosa",
      category: "solido",
    },
    {
      name: "Austin",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgtwitter.com",
      description:
        "euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas",
      price: "€28",
      type: "vegano",
      category: "liquido",
    },
    {
      name: "Hasad",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpginstagram.com",
      description: "Sed nunc est, mollis non, cursus non, egestas a, dui.",
      price: "€14",
      type: "sin lactosa",
      category: "solido",
    },
    {
      name: "Sawyer",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgyoutube.com",
      description:
        "eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed",
      price: "€12",
      type: "sin lactosa",
      category: "liquido",
    },
    {
      name: "Cherokee",
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpgbbc.co.uk",
      description:
        "ridiculus mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus.",
      price: "€12",
      type: "sin gluten",
      category: "solido",
    },
    {
      name: "Wade",
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpgbbc.co.uk",
      description:
        "velit in aliquet lobortis, nisi nibh lacinia orci, consectetuer euismod",
      price: "€17",
      type: "sin gluten",
      category: "solido",
    },
    {
      name: "Yvette",
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpgcnn.com",
      description: "diam vel arcu. Curabitur ut odio vel est tempor bibendum.",
      price: "€21",
      type: "sin gluten",
      category: "liquido",
    },
    {
      name: "Vaughan",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpginstagram.com",
      description:
        "Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum.",
      price: "€26",
      type: "sin lactosa",
      category: "liquido",
    },
    {
      name: "Anthony",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
      description:
        "metus eu erat semper rutrum. Fusce dolor quam, elementum at,",
      price: "€13",
      type: "vegano",
      category: "liquido",
    },
    {
      name: "Rose",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwhatsapp.com",
      description:
        "placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl.",
      price: "€37",
      type: "sin gluten",
      category: "solido",
    },
    {
      name: "Nina",
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpgnaver.com",
      description:
        "sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo.",
      price: "€13",
      type: "sin lactosa",
      category: "solido",
    },
    {
      name: "Noble",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwhatsapp.com",
      description:
        "libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet",
      price: "€31",
      type: "sin gluten",
      category: "solido",
    },
    {
      name: "Emmanuel",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
      description:
        "sed turpis nec mauris blandit mattis. Cras eget nisi dictum",
      price: "€17",
      type: "sin lactosa",
      category: "liquido",
    },
    {
      name: "Justin",
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpgcnn.com",
      description:
        "adipiscing, enim mi tempor lorem, eget mollis lectus pede et",
      price: "€24",
      type: "sin gluten",
      category: "solido",
    },
    {
      name: "Gray",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgreddit.com",
      description: "Donec est mauris, rhoncus id, mollis nec, cursus a, enim.",
      price: "€23",
      type: "vegano",
      category: "liquido",
    },
    {
      name: "Macaulay",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgnytimes.com",
      description:
        "lacus. Nulla tincidunt, neque vitae semper egestas, urna justo faucibus",
      price: "€36",
      type: "sin gluten",
      category: "solido",
    },
    {
      name: "Burton",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpggoogle.com",
      description: "tortor at risus. Nunc ac sem ut dolor dapibus gravida.",
      price: "€18",
      type: "vegano",
      category: "solido",
    },
    {
      name: "Zena",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwikipedia.org",
      description:
        "cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut",
      price: "€39",
      type: "vegano",
      category: "liquido",
    },
    {
      name: "Illiana",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpggoogle.com",
      description:
        "Aenean sed pede nec ante blandit viverra. Donec tempus, lorem",
      price: "€12",
      type: "vegano",
      category: "liquido",
    },
    {
      name: "Thaddeus",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgfacebook.com",
      description:
        "congue a, aliquet vel, vulputate eu, odio. Phasellus at augue",
      price: "€17",
      type: "sin lactosa",
      category: "liquido",
    }],

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        
case ORDER_AlPHABETIC:
        let copyThree = [...state.products];
        let sortedName = action.payload === "asc"
          ? copyThree.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          : copyThree.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
  
        return {
          ...state,
          products: sortedName
        };
        case ORDER_PRICE:
        let  priceOrder= [...state.products];
        let  price= action.payload === "asc"
          ? priceOrder.sort((a, b) => a.price.toLowerCase().localeCompare(b.price.toLowerCase()))
          : priceOrder.sort((a, b) => b.price.toLowerCase().localeCompare(a.price.toLowerCase()));
          return {
            ...state,
            products: price
          }; 
        case FILTER_TYPE: 
          const products2= state.allProducts;
          const productFind= [];
          let newproduct=[];
          products2.forEach(product=>{
              if(product.type.includes(action.payload)) productFind.push(product)
          }                
          );

          action.payload==="ALL" 
          ? newproduct= products2
          : newproduct= productFind
          return {
              ...state,
              products: newproduct
          };
          case FILTER_CATEGORY: 
          const products3= state.allProducts;
          const productFind3= [];
          let newproduct3=[];
          products3.forEach(product=>{
              if(product.category===action.payload) productFind3.push(product)
          }                
          );

          action.payload==="ALL" 
          ? newproduct3= products3
          : newproduct3= productFind3
          return {
              ...state,
              products: newproduct3
          }

       
        default:
      return state;
  }
  }
  export default  rootReducer
  