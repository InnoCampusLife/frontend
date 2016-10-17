@ECHO OFF

rem set %root% E:\Programming\Projects\University\UIS\frontend

cd /D "E:\Programming\Projects\University\UIS\frontend"

@start /b cmd /c "E:\SomeSOFT\winscp577\WinSCP.exe frontend_uis /keepuptodate E:\Programming\Projects\University\UIS\frontend\frontend /home/frontend/test_frontend"

REM Rebuild
	:rebuild

	echo Press [ENTER] key to rebuild:
	set /p continue=

	@start /b cmd /c uis_build

	if [%continue%]==[] goto rebuild

echo finished