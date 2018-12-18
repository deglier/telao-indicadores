Servidor = "10.221.236.101"
dac = "1"
Skills = "441;442;443;444;445;446;447;448;449;450;451;452;453;454;455;456;457;458;459;460;461;462;463"
Relat = "Integrated\Designer\Acompanhamento - Tempo Real  - GAB"
Set acsApp = CreateObject("ACSUP.cvsApplication")
Set acsSrv = CreateObject("ACSUPSRV.cvsServer")
scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
CentreVuOpen = acsApp.Servers.Count
        
    If (CentreVuOpen > 0) Then
        For i = 1 To CentreVuOpen
            If (acsApp.Servers.Item(i).Name = Servidor) Then
                Set acsSrv = acsApp.Servers.Item(i)
                found = True
                Exit For
            End If
        Next
    Else
        cmsoff = True
    End If
                           
       On Error Resume Next
    
       acsSrv.Reports.ACD = dac
       
       Set info = acsSrv.Reports.Reports(Relat)
    
        MsgBox info
    
       b = acsSrv.Reports.CreateReport(info, rep)
       
       If b Then
       
        rep.TimeZone = "default"
          rep.Window.Top = 0
          rep.Window.Left = 0
          rep.Window.Width = 0
          rep.Window.Height = 0
          rep.SetProperty "Grupos / Especialidades", Skills
          b = rep.ExportData(scriptdir & "\dados.csv", 59, 0, True, False, True)
          'b = rep.ExportData("", 9, 0, True, False, True)
          rep.Quit
             
        End If
    
   Set info = Nothing