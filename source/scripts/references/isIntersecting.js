function isIntersecting(alpha, omega) {
    var x = alpha.x - omega.x
    var y = alpha.y - omega.y
    
    var d = Math.sqrt(x * x + y * y)
    var l = (alpha.scale / 2) + (omega.scale / 2)
    
    return d < l
}

module.exports = isIntersecting
