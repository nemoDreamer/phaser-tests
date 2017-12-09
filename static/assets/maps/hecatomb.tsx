<?xml version="1.0" encoding="UTF-8"?>
<tileset name="hecatomb" tilewidth="11" tileheight="11" tilecount="60" columns="10" backgroundcolor="#000000">
 <image source="hecatomb.png" width="110" height="66"/>
 <terraintypes>
  <terrain name="Wall" tile="10"/>
  <terrain name="Thin Wall" tile="13"/>
  <terrain name="Forest" tile="40"/>
  <terrain name="Thin Forest" tile="50"/>
  <terrain name="Water" tile="31"/>
 </terraintypes>
 <tile id="0">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="5">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="6">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="10">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="11">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="12">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="13" terrain="1,1,1,1">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="secret" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="14" terrain="1,1,1,1">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="secret" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="15" terrain="1,1,1,1">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="secret" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="16" terrain="1,1,1,1">
  <properties>
   <property name="collides" type="bool" value="true"/>
   <property name="secret" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="17">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="17" duration="750"/>
   <frame tileid="7" duration="750"/>
  </animation>
 </tile>
 <tile id="18">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="18" duration="750"/>
   <frame tileid="8" duration="750"/>
  </animation>
 </tile>
 <tile id="19">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="19" duration="750"/>
   <frame tileid="9" duration="750"/>
  </animation>
 </tile>
 <tile id="20">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="21">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="22">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="22" duration="100"/>
   <frame tileid="23" duration="100"/>
   <frame tileid="24" duration="100"/>
   <frame tileid="25" duration="100"/>
   <frame tileid="26" duration="100"/>
   <frame tileid="25" duration="100"/>
   <frame tileid="24" duration="100"/>
   <frame tileid="23" duration="100"/>
  </animation>
 </tile>
 <tile id="23">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="24">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="25">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="26">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="27">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="28">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="29">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="30" terrain="4,4,4,4" probability="2">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="31" terrain="4,4,4,4" probability="0.25">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="31" duration="250"/>
   <frame tileid="32" duration="250"/>
   <frame tileid="33" duration="250"/>
   <frame tileid="34" duration="250"/>
   <frame tileid="30" duration="1000"/>
  </animation>
 </tile>
 <tile id="32" terrain="4,4,4,4" probability="0.25">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="32" duration="250"/>
   <frame tileid="33" duration="250"/>
   <frame tileid="34" duration="250"/>
   <frame tileid="30" duration="1250"/>
   <frame tileid="31" duration="250"/>
  </animation>
 </tile>
 <tile id="33" terrain="4,4,4,4" probability="0.25">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="33" duration="250"/>
   <frame tileid="34" duration="250"/>
   <frame tileid="30" duration="750"/>
   <frame tileid="31" duration="250"/>
   <frame tileid="32" duration="250"/>
  </animation>
 </tile>
 <tile id="34" terrain="4,4,4,4" probability="0.25">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
  <animation>
   <frame tileid="34" duration="250"/>
   <frame tileid="30" duration="1500"/>
   <frame tileid="31" duration="250"/>
   <frame tileid="32" duration="250"/>
   <frame tileid="33" duration="250"/>
  </animation>
 </tile>
 <tile id="35">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="36">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="37">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="38">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="39">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="40" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="41" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="42" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="43" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="44" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="45" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="46" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="47" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="48" terrain="2,2,2,2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="49">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="50" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="51" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="52" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="53" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="54" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="55" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="56" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="57" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="58" terrain="3,3,3,3">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="59">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
</tileset>
