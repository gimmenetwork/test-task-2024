export default function ({ store }) {
    // Load initial state from localStorage
    const savedState = localStorage.getItem(store.$id);
    if (savedState) {
      store.$patch(JSON.parse(savedState));
    }
  
    // Subscribe to store changes
    store.$subscribe((mutation, state) => {
      localStorage.setItem(store.$id, JSON.stringify(state));
    });
  }
  