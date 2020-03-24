module main

go 1.13

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/valyala/fasttemplate v1.1.0 // indirect
	handler v0.0.0-00010101000000-000000000000 // indirect
)

replace handler => ./handler

replace types => ./types
