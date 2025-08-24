
/*
    Para perceber este código aconselha-se saber o seguinte:
        --Date
        --ciclos, condicões
        -- classes
        -- canvas
        -- Geometria
    Classe que cria o esqueleto do relogio
*/
class relogio {
    constructor() {
        /*
            Cosntrutur do relogio
            data;
            hora;
            minuto;
            segundo;
        */
        let data= new Date();
        this.hora=data.getHours();
        this.minuto=data.getMinutes();
        this.segundo=data.getSeconds();
    }

 /* gets das horas em number*/
    getHora(){
        return this.hora;
    }
 /* gets das horas em Strings*/
     getHora_apresentar(){
        let hora=""+this.hora;
        if(this.hora<=9)
            hora="0"+this.hora;
        
        return hora;
    }
 /* gets dos minutos*/
    getMinuto(){
        return this.minuto;
    }
 /* gets dos minutos em Strings*/
     getMinuto_apresentar(){
        let minuto=""+this.minuto;
        if(this.minuto<=9)
            minuto="0"+this.minuto;
        
        return minuto;
    }
 /* gets dos segundos*/
    getSegundo(){
        return this.segundo;
    }

     /* gets dos segundos em Strings*/
    getSegundo_apresentar(){
        let segundo=""+this.segundo;
        if(this.segundo<=9)
            segundo="0"+this.segundo;
        
        return segundo;
    }


 /* Função que constroi as linhas de segundos e minutos*/
    criar_linha(x0,y0,x1,y1,inicio_rotacao){
        let objecto= new Path2D();
        objecto.moveTo(x0,y0);
        objecto.lineTo(x0+(x1)*Math.cos(Math.PI/180*(inicio_rotacao)),
        y0-(y1)*Math.sin(Math.PI/180*inicio_rotacao));

        return objecto;

    }

}
const i=1000;  /*Constantes dos segundos 1000 equivale a um segundo usando a funcção setTimeout */



function mostar_quadro() {
    var canva= document.getElementById("canvas");
    var relog=new relogio();

    if(canva.getContext /*Validação das canvas*/){

        canvas=canva.getContext("2d");
        canvas.clearRect(0,0,360,360);
        //centro do relogio
        var centro= new Path2D()
        //linhas de indicacao do relogio
        var linhas= new Path2D()

        // construir contorno do relogio
        var contorno= new Path2D()

        var p_segndo= new Path2D();

        var p_Minuto= new Path2D();

        var p_hora= new Path2D();
        //construir centro
        canvas.save();
        centro.arc(180,180,4,0,Math.PI/180*360,true);
        canvas.fill(centro);
        canvas.restore();

        //construir contorno
        canvas.save();
        contorno.arc(180,180,140,0,Math.PI/180*360,true);
        canvas.strokeStyle="blue";
        canvas.stroke(contorno);
        canvas.restore();
        
        //linhas de indicacao

        canvas.save();
        for (let pontos =1; pontos <=360;pontos++ ) {
            if(pontos%30==0){


                
                linhas.moveTo(180+(140)*Math.cos(Math.PI/180*pontos),
                180-(140)*Math.sin(Math.PI/180*pontos));   
                linhas.lineTo(180+(130)*Math.cos(Math.PI/180*pontos),
                180-(130)*Math.sin(Math.PI/180*pontos));  
                canvas.stroke(linhas);

                canvas.fillText((parseInt(pontos/30)),180+(120)*Math.cos(Math.PI/180*(90-pontos)),
                180-(120)*Math.sin(Math.PI/180*(90-pontos)));

                canvas.font="12px Lucida Grande";

            }

            if(pontos%6==0){
                linhas.moveTo(180+(140)*Math.cos(Math.PI/180*pontos),
                180-(140)*Math.sin(Math.PI/180*pontos));   
                linhas.lineTo(180+(135)*Math.cos(Math.PI/180*pontos),
                180-(135)*Math.sin(Math.PI/180*pontos));  
                canvas.stroke(linhas);
            }
           
            
        }
        canvas.strokeStyle="black";
        canvas.restore();

        //construir o ponteiro do segundo
      
        canvas.save();
        
        p_segndo=relog.criar_linha(180,180,120,120,90-relog.getSegundo()*6);
        canvas.strokeStyle="red";
        canvas.stroke(p_segndo);
        canvas.restore();

        //construir o ponteiro do  Minutos

        canvas.save();
        canvas.lineWidth=2;
        p_Minuto=relog.criar_linha(180,180,100,100,90-relog.getMinuto()*6);
       
        canvas.strokeStyle="black";
        canvas.stroke(p_Minuto);
        canvas.restore();
      

        //construir o ponteiro do  horas

        canvas.save();
        canvas.lineWidth=3;        
         
        p_hora.moveTo(180,180);
        p_hora.lineTo(180+(90)*(Math.cos(Math.PI/180*(90-(relog.getHora())*30-0.5*relog.getMinuto()))),   
        180-(90)*Math.sin(Math.PI/180*(90-(relog.getHora())*30 -0.5*relog.getMinuto())));
        canvas.strokeStyle="black";
        canvas.stroke(p_hora);
        canvas.restore();

        //construir as horas por escrito da seguinte forma(00:00:00)
        canvas.save();
        canvas.font="25px Lucida Grande";
        canvas.fillText(`${relog.getHora_apresentar()} : ${relog.getMinuto_apresentar()} : ${relog.getSegundo_apresentar()}`,125,220);
        canvas.fillStyle="red";
        
         canvas.restore();
       setTimeout(mostar_quadro,i);
        
    }else{
        alert("Canva nao existe");        
    }
}
