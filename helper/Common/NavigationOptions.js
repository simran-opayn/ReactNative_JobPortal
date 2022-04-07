const ImagesPath = require("../images/ImagesPath");
const { color } = require("./Colors");
const fonts = require("./fonts");

module.exports = {
    NavHeaderStyle: title =>{
      return {headerStyle: {
          backgroundColor: color.mainColor,
          shadowOpacity: 0,
        }, 
        headerShadowVisible: false, 
        headerBackTitleVisible: false, 
        headerTitleStyle:{color:"white"}, 
        title: title,
        // headerBackImageSource:ImagesPath.backImg, 
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: fonts.semiBold,
          fontSize: 20,
        },
        animationEnabled: false,
      }
  }
}