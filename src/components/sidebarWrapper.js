import styled from '@emotion/styled';


const SidebarWrapper = styled('aside')`
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0; 
  padding-bottom:60px;

   

  @media only screen and (max-width: 1023px) {
    width: 100%; 
    height: 100%;
  }

  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }

  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    height: auto;
    position:relative;
  }

  .nestedChild > button { 
    height:100%; 
    left:0; 
    top:0;
    padding:2px 0 px 5px; 
    background:none; 
    border:none; 
    width:11%; 
    text-align:left; 
    cursor:pointer
  }

  .firstLevel > ul > li > ul > li > a{
    padding-left: 10;
    padding-top: 5px;
    padding-bottom: 5px;
    
  }
  .firstLevel > ul > li > ul > li.nestedLevel:hover{
    background-color:transparent;  
  }

  .firstLevel > ul > li > ul > li > ul > li {
    margin-left: 30px; 
  }

  .firstLevel > ul > li > ul > li.nestedLevel > ul li{
    padding-left: 10;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: ${({ navActive = "blue" }) => navActive} 1px solid;
  }


  .firstLevel > ul > li > ul > li.nestedLevel > ul li:hover{
    padding-left: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: ${({ menuHover = "transparent" }) => menuHover};  
  }
`;


export default SidebarWrapper;