import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Status} from '../../types/app'
import { Item, Image } from '../../types'
import moment from 'moment'
import uuid from 'uuid/v1'
import { itemActions } from '../module/item'
import { API } from '../firebase/api'
import { ReduxState } from '../module'

/////////////////////////////////////////////////
//////////          Item 作成            ////////
////////////////////////////////////////////////

export const useCreateItem = () => {
  const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
  const dispatch = useDispatch()
  const user = useSelector((state: ReduxState)=>state.User)
  const api = new API()

  const createItem = useCallback(async (item: Item) => {
    try{
        // Loading開始
        setStatus({...status, Loading: true})
        
        // create itemID
        item.ID = moment().toISOString() + uuid()

        // upload Images to Storage
        const newImages: Image[] = []
        await item.Images.forEach(async (image: Image)=>{
            const newImage = await api.uploadImage(image)
            newImages.push(newImage)
        })
        item.Images = newImages

        // create Item to Storage
            const path = "users/" + user.ID + "/items"
        await api.createItem(item, path)

        // create Item to Store
        dispatch(itemActions.createItem(item))

        // Loading終了
        setStatus({...status, Loading: false})

    }catch(err){

    }

  }, [status])
  return { "createItem": createItem, "status": status}
}

/////////////////////////////////////////////////
//////////          Item 作成            ////////
////////////////////////////////////////////////

export const useUpdateItem = () => {
    const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
    const dispatch = useDispatch()
    const api = new API()
    const user = useSelector((state: ReduxState)=>state.User)
  
    const updateItem = useCallback(async (item: Item) => {
      try{
            // Loading開始
            setStatus({...status, Loading: true})

            // upload Images to Storage
            const newImages: Image[] = []
            await item.Images.forEach(async (image: Image)=>{
                const newImage = await api.uploadImage(image)
                newImages.push(newImage)
            })
            item.Images = newImages

            // create Item to Storage
            const path = "users/" + user.ID + "/items"
            await api.updateItem(item, path)

            // create Item to Store
            dispatch(itemActions.updateItem(item))
  
            // Loading終了
            setStatus({...status, Loading: false})
          
      }catch(err){
  
      }
  
    }, [status])
    return { "updateItem": updateItem, "status": status}
  }

  export const useDeleteItem = () => {
    const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
    const dispatch = useDispatch()
    const user = useSelector((state: ReduxState)=>state.User)
    const api = new API()
  
    const deleteItem = useCallback(async (item: Item) => {
      try{
            // Loading開始
            setStatus({...status, Loading: true})

            // upload Images to Storage
            await item.Images.forEach(async (image: Image)=>{
                await api.deleteImage(image)
            })

            // create Item to Storage
            const path = "users/" + user.ID + "/items"
            await api.deleteItem(item, path)

            // create Item to Store
            dispatch(itemActions.deleteItem(item))

            // Loading終了
            setStatus({...status, Loading: false})
          
      }catch(err){
  
      }
  
    }, [status])
    return { "deleteItem": deleteItem, "status": status}
  }