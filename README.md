# UEK-223-Group-6-Frontend

## Checkliste

### Punkte (Frontend-relevant)
- Dokumentation: ___ / 4
- Testing: ___ / 5
- Umsetzung / Code: ___ / 8

### Frontend - Setup
- [ ] React startet ohne Fehler
- [ ] TypeScript ohne Compile-Errors
- [ ] API Base URL konfiguriert
- [ ] Login funktioniert (JWT gespeichert)

### Routing & Views
- [ ] Route fuer Custom List vorhanden
- [ ] User View (eigene Eintraege)
- [ ] Admin View (alle Eintraege)

### Custom List - Use-Cases (Frontend)

#### UC1 Create Listeneintrag
- [ ] Formular mit Titel, Text, Wichtigkeit
- [ ] Client-Validation (Titel min 3, Text max 500)
- [ ] Submit Button disabled bei Fehlern
- [ ] Erfolgsmeldung sichtbar

#### UC2 Update Listeneintrag
- [ ] Edit View oder Modal vorhanden
- [ ] Felder vorbefuellt
- [ ] Client-Validation greift
- [ ] Erfolgsmeldung sichtbar

#### UC3 Delete Listeneintrag
- [ ] Delete Button vorhanden
- [ ] Bestätigungsdialog
- [ ] Erfolgsmeldung nach Loeschung

#### UC4 User sieht eigene Eintraege
- [ ] Liste nur eigene Eintraege
- [ ] Pagination 10
- [ ] Sortierung Wichtigkeit Datum Titel
- [ ] Filter Wichtigkeit

#### UC5 Admin sieht alle Eintraege
- [ ] Admin erkennt Admin View
- [ ] Liste aller User-Eintraege
- [ ] Pagination 10
- [ ] Sortierung User Wichtigkeit Datum
- [ ] Filter User oder Wichtigkeit
- [ ] Admin kann Eintraege loeschen

### Error Handling
- [ ] API Errors werden angezeigt
- [ ] Validation Errors sichtbar
- [ ] 401 fuehrt zu Redirect Login
- [ ] 403 Meldung sichtbar
