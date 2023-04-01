package routes

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"thanapong.com/order-service/middlewares"
	"thanapong.com/order-service/models"
)

func InitOrderRoute(rg *gin.RouterGroup, db *gorm.DB) {

	routerGroup := rg.Group("/orders")

	routerGroup.POST("/", middlewares.AuthJWT(), func(c *gin.Context) {
		userId := c.MustGet("userId").(float64)

		var body models.InputOrder
		c.ShouldBindJSON(&body)

		order := models.Order{
			UserId:    int(userId),
			ProductID: body.ProductID,
		}

		result := db.Create(&order)
		if result.Error != nil {
			c.JSON(500, gin.H{
				"message": "error",
			})
			return
		}

		c.JSON(200, gin.H{
			"message": "order saved: " + strconv.Itoa(int(userId)),
			"order":   order,
		})
	})

}
