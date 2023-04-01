package routes

import "github.com/gin-gonic/gin"

func InitHomeRoute(rg *gin.RouterGroup) {

	routerGroup := rg.Group("/")

	routerGroup.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "order service",
		})
	})
	
}