#version 330 compatibility

in vec4  vColor;
in float vLightIntensity;
in vec2  vST;

uniform float uAd;
uniform float uBd;
uniform float uTol;
uniform vec4  uElipColor;

uniform sampler2D Noise2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uAlpha;

void
main( )
{
  float rA = uAd/2.;
	float rB = uBd/2.;

	float s = vST.s;
	float t = vST.t;
	int numins = int( s / uAd );
	int numint = int( t / uBd );

  vec4 nv = texture(Noise2, uNoiseFreq * vST);
  float n = nv.r + nv.g + nv.b + nv.a;
  n =  (n - 2); //James saved me
  n *= uNoiseAmp;

	gl_FragColor = vColor;		// default color



			float scenter = float(numins)*uAd + rA;
			float tcenter = float(numint)*uBd + rB;

      float oldDist = sqrt( scenter*scenter + tcenter*tcenter );
      float newDist = oldDist + n;
      float scale = newDist / oldDist;

      scenter *= scale;
      tcenter *= scale;

      float d = pow((s-scenter)/rA, 2) + pow((t-tcenter)/rB, 2);
      float tt = smoothstep( 1-uTol, 1+uTol, d );
			gl_FragColor = mix( uElipColor, vec4(vColor.rgb, uAlpha), tt );
      if(gl_FragColor.a == 0.0)
        discard;

	gl_FragColor.rgb *= vLightIntensity;	// apply lighting model
}
