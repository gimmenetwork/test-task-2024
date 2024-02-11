

export function useLocalStorage() {

    function getItem(key:string){
        const user = localStorage.getItem(key)
        return user && JSON.parse(user)
    }

    function setItem(key:string, value:string){
        localStorage.setItem(key, JSON.stringify(value))
    }

    function removeItem(key:string){
        localStorage.removeItem(key)
    }

    function localStorageSetup<T>(key:string, value:T){
        const user = localStorage.getItem(key)
        if(user){
            console.log('got user item')
            return JSON.parse(user)

        }
        else {
            localStorage.setItem(key, JSON.stringify(value))
            console.log('successfully set')
            return
        }

        
    }

    return { localStorageSetup, setItem, getItem, removeItem }
}