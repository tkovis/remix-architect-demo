@app
my-remix-app-f646

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId

project
  pk *String  # userId
  sk **String # projectId

