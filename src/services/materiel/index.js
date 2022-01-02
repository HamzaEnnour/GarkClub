const { addMateriel } = require('./addMateriel')
const { deleteMateriel } = require('./deleteMateriel')
const { editMateriel } = require('./editMateriel')
const { getAllMateriels } = require('./getAllMateriels')
const { getMaterielsByAcademy } = require('./getMaterielsByAcademy')

exports.addMateriel = addMateriel
exports.deleteMateriel = deleteMateriel
exports.editMateriel = editMateriel
exports.getAllMateriels = getAllMateriels
exports.getMaterielsByAcademy = getMaterielsByAcademy
