@ECHO OFF

:rebuild

	echo.
	echo Press [ENTER] key to rebuild

	set /p continue=

	call npm run build

	echo.
	echo Build finished!
	echo.

	goto rebuild