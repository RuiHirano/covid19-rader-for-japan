import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Status} from '../../types/app'
import { ReduxState } from '../module/index'
import { Item, User, Notification, Image, Setting } from '../../types'
import { userActions } from '../module/user'
import { API } from '../firebase/api'
import { itemActions } from '../module/item'

/////////////////////////////////////////////////
//////////          Item 作成            ////////
////////////////////////////////////////////////

export const useUpdateUserInfo = () => {
  const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
  const dispatch = useDispatch()
  const api = new API()

  const updateUserInfo = useCallback(async (user: User) => {
    try{
        // Loading開始
        setStatus({...status, Loading: true})

        const newImage = await api.uploadImage(user.Profile.Thumbnail)
        user.Profile.Thumbnail = newImage
        
        // upload User to filestore
        await api.updateUserInfo(user)

        // store User
        dispatch(userActions.updateUserInfo(user))

        // Loading終了
        setStatus({...status, Loading: false})

    }catch(err){

    }

  }, [status])
  return { "updateUserInfo": updateUserInfo, "status": status}
}

/////////////////////////////////////////////////
//////////          Item 作成            ////////
////////////////////////////////////////////////

export const useDeleteAccount = () => {
    const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
    const dispatch = useDispatch()
    const user = useSelector((state: ReduxState)=>state.User)
    const items: Item[] = useSelector((state: ReduxState)=>state.Items)
    const api = new API()
  
    const deleteAccount = useCallback(async () => {
      try{
          // Loading開始
          setStatus({...status, Loading: true})
          
          // delete UserInfo
          await api.deleteImage(user.Profile.Thumbnail)
          await api.deleteUserInfo(user)

          // delete Items
          await items.forEach(async(item: Item)=>{
            // delete image
            await item.Images.forEach(async(image: Image)=>{
              await api.deleteImage(image)
            })
            // delete item
            const path = "users/" + user.ID + "/items"
            await api.deleteItem(item, path)
          })

          // upload Images to Storage
          await api.deleteAccount()

          // signout
          await api.signOut()

          // StoreのItemsを初期化
          dispatch(itemActions.createItems([]))
  
          // Storeのユーザ情報を初期化
          dispatch(userActions.updateUserInfo(new User()))
  
          // Loading終了
          setStatus({...status, Loading: false})
          
      }catch(err){
  
      }
  
    }, [status])
    return { "deleteAccount": deleteAccount, "status": status}
  }

  export const useChangePassword = () => {
    const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
    const dispatch = useDispatch()
    const user = useSelector((state: ReduxState)=>state.User)
    const api = new API()
  
    const changePassword = useCallback(async () => {
      try{
          // Loading開始
          setStatus({...status, Loading: true})
          
          // change Password
          await api.changePassword(user.Setting.Email)
  
          // Loading終了
          setStatus({...status, Loading: false})
          
      }catch(err){
  
      }
  
    }, [status])
    return { "changePassword": changePassword, "status": status}
  }

  export const useChangeEmail = () => {
    const [status, setStatus] = useState<Status>({Progress: 0, Log: "", Error: "", Loading: false})
    const dispatch = useDispatch()
    const user: User = useSelector((state: ReduxState)=> state.User)
    const api = new API()
  
    const changeEmail = useCallback(async (email: Setting['Email']) => {
      try{
          // Loading開始
          setStatus({...status, Loading: true})
          
          // create itemID
          user.Setting.Email = email

          // update userInfo to Storage
          await api.changeEmail(email)
  
          // store User
          dispatch(userActions.updateUserInfo(user))
  
          // Loading終了
          setStatus({...status, Loading: false})
          
      }catch(err){
  
      }
  
    }, [status])
    return { "changeEmail": changeEmail, "status": status}
  }