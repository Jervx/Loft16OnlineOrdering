### TODO: User should exist when reload happens
- [x] save it on the cookies
- [x] on load we should load it & dispatch load

### TODO: PRODUCT
- [x] Search & Filters
- [x] Product Details Page & Functionality
- [doing] Add to cart funcionality

### TODO: User Cart | Orders | Arrived | Cancelled
- [x] should request the data from backend
- [x] mycart
- [x] mycart item view
- [x] delete item & add item logic should be in front end (Usually cancellation of order)
      & will only sent the full cart object to the server
- [x] Create a modal for checkout
- [x] Create model for pending order
- [x] On Checkout Create record in Orders collection & pending orders collection
- [x] Orders Tab Page
- [x] removable order if not yet accepted by admin
- [x] Cancelled Orders
- [x] Arrived Orders
- [x] deletable record in Arrived & Cancelled

### TODO: LAST THING ON CARTS 
- [x] When adding to cart, check if the item with the same variant is in the cart
     if so, 
     
        check if the qty of the item already in cart plus the qty of current
        is not greater than the limit stock of the product
       
       |if exceeded 
            then notify you already have this on cart and it will exceed the current stock

       |else 
            add it on cart

    else 
        add it on cart


- [doing] User Order Detail View
- [doing] Like an item ( add field on user model )
        likes [{ product_ID, product_name, thumb }]
        

### TODO: MAJOR PART SETTINGSS FINAL!!!!!
- [x] Create the page for Settings
- [x] load latest user settings
- [x] change photo is not upload photo only pre created graphics avatar
- [x] emails
- [x] mobile numbers
- [x] add more shipping address




### TODO: ON USER IF MORE TIME LEFT
- [x] Notification Modal
    - [] new field on user -> notifications{ id, title, type, message , link }
- [x]



### TODO: ADMIN
- [x] Admin panel
    - [x] sign in first before loading the system
- [x] Admin nav
    - [x]Quick Insights
        backend
           [x] - total pending
           [x] - completed orders
           [x] - getAll product sort by total earnings                }
    - [x]Product & Tags 
        backend
         ** Product Categories **
            - add categorie model
              {
                  schema_v
                  category_name
                  associated_products[
                      {
                          product_ID,
                          product_name,
                          thumb
                      }
                  ]
                  cat
                  cby
                  uat
                  uby
                  dat
              }
            - getAllCategories
            - searchCategories
            - addCategories

            ** Product Management **

            - getAllProduct
            - updateProducts
                mode 0 create, 1 update, -1 delete
            

    - pending orders 
        backend 
            ** Pending Orders **
                - getAllPending
                    if order id provided find specific,
                    if not return all
                - updatepending
                    mode 0 accept, -1 reject
             NOTE: When the chosen courier is not in courier options, then you cannot accept it anymore 
             NOTE: When accepting, check if the user exist, if not, simply remove the order_in_progress entry & remove from order entry
            
            ** In Progress **
                - getAllInProgress
                    if order id provided find specific,
                    if not return all
                - updatepending
                    mode 0 update, mode 1 complete(move to delivered)

            ** Completed Orders **
                - getAllCompleted
                    if order_id provided find specific
                    if not return all
                - deleteCompleted
                    if order_id and mode -1 provided
                        then remove specific
                    if not remove all data
                
    - courier options 
        - getAllCourier
        - updateCourier
            mode 0 create, mode 1 update, mode -1 delete
        
    - admins 
        - getAllAdmin
        - updateAdmin
            id
            NOTE: if your role is not root, then you can't 
            mode 0 create, mode 1 update, mode -1 delete(Only Root)
        
    - customers 
        - getUser
            - if email provided, then return specific
            - if note return all
        - updateUser
            NOTE: You can only update password but not the info of the user
            mode 0 create,
            mode 1 update,
            mode -1 






