import { Container, Divider, List } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import {Box, Grid} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Item from './Reusecomponets/Item';
import ProductsList from './ProductsList.json'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fullWidth } from 'validator/lib/isFullWidth';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 400;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));


function Easyshop() {
    const [open, setOpen] = useState(false)
    const [cartList, setcartList] = useState([])

    useEffect(()=>{
        setcartList(cartList)
    },[cartList])

    const addToCart=(productName, productDetails, productPrice, productPath)=>{
            
            setcartList([...cartList, {productName, productDetails, productPrice, producttotalPrice: productPrice , productQty: 1, productPath  }])
                 
      }

      const TotalAmount=(productName, productPrice, event)=>{

        const newArr = cartList.map(obj => {
            if (obj.productName==productName && obj.productPrice == productPrice && event == "add") {
              return {...obj, producttotalPrice : obj.producttotalPrice + productPrice, productQty: (obj.producttotalPrice + productPrice) / productPrice};

            }else  if (obj.productName==productName && obj.productPrice == productPrice && event == "less") {
                if(obj.producttotalPrice == productPrice){
                    //
                }else{
                    return {...obj, producttotalPrice : obj.producttotalPrice - productPrice, productQty: (obj.producttotalPrice - productPrice) / productPrice};
                }
              }
          
            return obj;
          });

          setcartList(newArr)
      }



      const removeFromCart=(productName)=>{
        const removeFromCart = cartList.filter(object => {
            return object.productName !== productName;
          });
          setcartList(removeFromCart)
      }

  return (

    <Container maxWidth="100vw" sx={{backgroundColor:"#00000099", height:"auto"}}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"#000"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Realiti.io
          </Typography>
         <IconButton onClick={()=>setOpen(true)}>
                <ShoppingCartIcon style={{color:"#FFF"}}/>
         </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    <Container maxWidth='xl' sx={{ height:"auto", marginTop:"2%", }}>
    <Box sx={{ width: '100%' }}>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
             ProductsList.map((ProductsDetails)=>{
                return(
        <Grid item xs={3}>
          <Item> 
          <Card sx={{ maxWidth: fullWidth }}>

      <CardMedia
        sx={{ height: 300 }}
        image={ProductsDetails.ProductPath}
        title="green iguana"
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div" display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
        <Typography gutterBottom variant="h6" component="div">{ProductsDetails.ProductName}</Typography>
        <Typography gutterBottom variant="h6" component="div" marginLeft={"1%"} color={"#b30000"}>RS-{ProductsDetails.ProductPrice}</Typography>
          
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {ProductsDetails.ProductDetails}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" style={{backgroundColor:"gray"}} onClick={()=>addToCart(ProductsDetails.ProductName, ProductsDetails.ProductDetails, ProductsDetails.ProductPrice, ProductsDetails.ProductPath  )}>Add Cart</Button>
      </CardActions>
    </Card> 
    
          </Item>
        </Grid>
          )    
        })
        }
      </Grid>


    </Box>
    </Container>
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        backgroundColor="#000"
        variant="persistent"
        anchor="right"
        open={open}
      >
            
            <DrawerHeader>
          <IconButton onClick={()=>setOpen(false)}>
            <ChevronLeftIcon/>
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
            {
                
                cartList.map((cartlist)=>{
                   
                   console.log(cartlist.productPath+ "path")
                 //  var pathLink = require("./Products/876661122392077-1-product.webp")

                    return(
                        <Card sx={{ maxWidth: fullWidth }}>

                          <CardMedia
                              sx={{ height: 150 }}
                              image={cartlist.productPath}
                              title="green iguana"
                            />
                        {/* <img src={cartlist.productPath} style={{width:"150px", height:"150px", marginLeft:"1%"}}/> */}
                  
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
                          <Typography gutterBottom variant="h5" component="div">{cartlist.productName}</Typography>
                          <Typography gutterBottom variant="h6" component="div" marginLeft={"1%"} color={"#b30000"}>RS-{cartlist.productPrice}</Typography>
                            
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                           {cartlist.productDetails}
                          </Typography>
                        </CardContent>
                        <CardActions style={{display:"flex", justifyContent:"space-around",}}>
                          <Typography  style={{}} >Total amout - {cartlist.producttotalPrice} </Typography>
                          <CardActions >
                          <RemoveIcon size="small" style={{Color:"gray"}} onClick={()=>TotalAmount(cartlist.productName, cartlist.productPrice, "less")}  ></RemoveIcon>
                          <Typography style={{marginLeft:"3px"}}>Qty {cartlist.productQty}</Typography>
                          <AddIcon size="small" style={{Color:"gray"}} onClick={()=>TotalAmount(cartlist.productName, cartlist.productPrice, "add")}>+</AddIcon>
                          </CardActions>

                        </CardActions>
                        <CardActions>
                        <Button style={{height:"50px", fontSize:"20px", backgroundColor:"gray", margin:"2%", width:"200px"}}  variant="contained" onClick={()=>removeFromCart(cartlist.productName)} >remove</Button>

                        </CardActions>
                      </Card> 
                    )          
                })
            }
            
        </List>
    </Drawer>

    </Container>

  )
}

export default Easyshop


