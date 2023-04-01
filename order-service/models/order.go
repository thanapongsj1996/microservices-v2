package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	ID        int           `json:"id" gorm:"primaryKey;autoIncrement;not null"`
	UserId    int           `json:"userId" gorm:"type:integer;not null"`
	ProductID pq.Int64Array `json:"productId" gorm:"type:integer[];not null"`
}

type InputOrder struct {
	ProductID []int64 `json:"productId"`
}
