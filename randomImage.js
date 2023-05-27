const randomImage = () => {
  const imgurUrl = 'https://i.imgur.com/'

  const imageLinks = [
    'OJEyh4Y.png',
    'WD1e5Yn.png',
    'DBwJMYP.png',
    'hViWTUW.png',
    'uLZI8QT.png',
    'XZuOGrH.png',
    'VDE3P4P.png',
    'eypdkkS.png',
    '0c8wObE.png',
    'phy5toz.png',
    'gufnJ4Z.png',
    'DGlVFZ3.png',
    'LzFuiKF.png',
    'DKaYEX9.png',
    'KwK8gmz.png',
    'g47KQ4k.png',
    '50IacV2.png',
    'W3N1EBS.png',
    'ZsquWCV.png'
  ]

  const randomIndex = Math.floor(Math.random() * imageLinks.length)

  return `${imgurUrl}${imageLinks[randomIndex]}`
}

module.exports = { randomImage }
