// export let isAuthenticated = false;
export const isAuthenticated = () => {
    console.log("Function called")
    if (typeof window !== 'undefined' && window.localStorage) {
        console.log("Local Storage now present")
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    // return false; // Default to false if localStorage is not available
  };