//=============================================================================
//
//  Recorder fingering plugin
//  http://musescore.org/en/project/naffingering
//
//  Copyright (C)2012 Nicolas Froment (lasconic)
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License version 2.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
//=============================================================================

//
// This is ECMAScript code (ECMA-262 aka "Java Script")
//
                   //F# G    G#   A    A#   B    C     C#   D    D#   E    F
var fingerings = [ '1', '!', '2', '3', '#', '4', '$', '5',  '6', '^', '7', '&', 
                   '8', '*', '9', '0',  "\u008C", ')', "\u0090", "\u0092", "\u0094", "\u0096"]

var fontColor = new QColor("black");
var fontSize = 30;
var fontName = "NAFTracks Six Hole";
var xOffset = 0;
var yOffset = 5;
var startPitch = 66; //F#
var menuItem = "NAF Six Hole"
                                                        
//---------------------------------------------------------
//    init
//---------------------------------------------------------

function init()
      {
      
      }

//-------------------------------------------------------------------
//    run
//-------------------------------------------------------------------

function run()
      {
      var cursor   = new Cursor(curScore);
      cursor.staff = 0;
      cursor.voice = 0;
      cursor.rewind();  // set cursor to first chord/rest
      var font = new QFont(fontName, fontSize);
      while (!cursor.eos()) {
            if (cursor.isChord()) {
                  
                  var pitch = cursor.chord().topNote().pitch;
                  var index = pitch - startPitch;
                  if(index >= 0 && index < fingerings.length){ 
                      var text  = new Text(curScore);
                      text.text = fingerings[index];
                      text.defaultFont = font;
                      text.color = fontColor;
                      text.yOffset = xOffset;
                      text.yOffset = yOffset;
                      cursor.putStaffText(text);
                      }
                  }
            cursor.next();
            }
      }

var mscorePlugin = {
      menu: 'Plugins.' + menuItem,
      init: init,
      run:  run
      };

mscorePlugin;

