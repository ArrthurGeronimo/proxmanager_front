export const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}
//  121.314.124-12

export const cnpjMask = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}
//  09.376.495/0001-22

export const priceMask = value => {
  return value
  .replace(/\D/g, '')
  .replace(/(\d+)(\d{2})/, '$1.$2')
  }
//  100.99
// 10000.99

export const slugMask = value => {
  return  value.toString().toLowerCase()
	.replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
	.replace(/[èÈéÉêÊëË]+/g, 'e')       	// Special Characters #2
	.replace(/[ìÌíÍîÎïÏ]+/g, 'i')       	// Special Characters #3
	.replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')       	// Special Characters #4
	.replace(/[ùÙúÚûÛüÜ]+/g, 'u')       	// Special Characters #5
	.replace(/[ýÝÿŸ]+/g, 'y')       		// Special Characters #6
	.replace(/[ñÑ]+/g, 'n')       			// Special Characters #7
	.replace(/[çÇ]+/g, 'c')       			// Special Characters #8
	.replace(/[ß]+/g, 'ss')       			// Special Characters #9
	.replace(/[Ææ]+/g, 'ae')       			// Special Characters #10
	.replace(/[Øøœ]+/g, 'oe')       		// Special Characters #11
	.replace(/[%]+/g, 'pct')       			// Special Characters #12
	.replace(/\s+/g, '_')           		// Replace spaces with _
  .replace(/[^\w\_]+/g, '')       		// Remove all non_word chars
  .replace(/\_\_+/g, '_')         		// Replace multiple _ with single _
  .replace(/^_+/, '')             		// Trim _ from start of text
  .replace(/_+$/, '');            		// Trim _ from end of text
}