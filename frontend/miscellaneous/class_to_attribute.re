([ ]*[a-z]*[ ]*\(?)\.([a-z][a-z\-\_0-9]*)(\)?[\s]*[\,\[\{a-z\.\:\>])

(?# Regex to find class and capture it.)
(?# Used to replace .class with [class].)

(?# Example: Ctrl+H -> 'Replace with:' $1[$2]$3)
(?# It will .replace > .any .css.class:not(.notaion)
(?# with   [replace] > [any] [css][class]:not([notation])