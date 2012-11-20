//=============================================================================
//
//  6-hole Native American Flute fingering plugin
//  http://musescore.org/en/project/naffingering
//
//  Copyright (C) 2012 lasconic
//  additional development by Scott Scheiman
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
                   // F#   G    G#   A    A#   B    C    C#    D    D#   E    F
const fingerings = [ '1', '!', '2', '3', '#', '4', '$', '5',  '6', '^', '7', '~', 
                     '8', '*', '9', '0', "\u008C"]

const fontColor = new QColor("black");
const errorColor = new QColor("red");
//    errorColor.setAlpha(0); // uncomment this line if the "error" fingering is not wanted
const errorFingering = '(';
const fontSize = 30;
const fontName = "NAFTracks Six Hole";
const xOffset = 0;
const yOffset = 5;
const startPitch = 66; //F#
const menuItem = "NAF Fingering (6 Hole)"
                                                        
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
                  
                  var topNote = cursor.chord().topNote();
                  
                  if (topNote.tied <= 1 ) {
                      var text = new Text(curScore);
                      text.defaultFont = font;
                      text.yOffset = xOffset;
                      text.yOffset = yOffset;

                      var pitch = topNote.pitch;
                      var index = pitch - startPitch;
                      if (index >= 0 && index < fingerings.length) {
                          text.color = fontColor;
                          text.text  = fingerings[index];
                          }
                      else {
                          text.color = errorColor;
                          text.text  = errorFingering;
                          }
                      
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
