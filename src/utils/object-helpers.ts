export const  updateObjectArray = (items: Array<any>, itemID: any, objPropName: any, newObjProps: any ) => {
    return items.map(u => u[objPropName] === itemID ? {...u, ...newObjProps} : u)
}