import React, {Component, useState} from 'react'
import {Col, Row} from "react-bootstrap";
import { fabric } from 'fabric-with-gestures';
import {} from "./TwoDGraph";
import MathLive from '';
import 'mathlive/dist/mathlive.core.css';
import 'mathlive/dist/mathlive.css';
import Menu from "./Menu";

function whiteBoard() {
    const socket = {};
    const socketLoaded = false;
    const canvas = null;
    const roomName = '';
    const toolSelected = '';
    const tools = Tools;
    const selectorOpen = false;
    const shapeStarted = false;
    const shapeBeingAdded = null;
    const lastPosX = null;
    const lastPosY = null;
    const shapeStartX = 0;
    const shapeStartY = 0;
    const snapshotHistory = [];
    const currentSnapshotIndex = -1;
    const canRedo = false;
    const fillColor = '#000000';
    const strokeColor = '#000000';
    const strokeWidth = 3;
    const isTypingMath = false;
    const polygonPoints = [];
    const clipboard = {};
    const nMathFields = 0;
    const currentMathfield = null;
    const mathCoords = [];
    const isMobile = false;
    const shouldSelectTextBox = false;

    const maxNewImageHeight = 500;
    const maxNewImageWidth = 360;

    function isProduction() {
        return window.location.hostname.indexOf('whiteborb') > -1;
    }

    function urlForSocket() {
        const protocol = isProduction() ? 'https://' : 'http://';
        const hostName = isProduction() ? window.location.hostname : 'localhost';
        const hostPort = isProduction() ? 443 : 3000;
        return protocol + hostName + `:${hostPort}`;
    }

    function positionStringsForTool() {
        switch (toolSelected) {
            case 'ellipse':
                return { x: 'rx', y: 'ry' };
            case 'line':
            case 'arrow':
                return { x: 'x2', y: 'y2' };
            default:
                return { x: 'width', y: 'height' };
        }
    }

    //mounted 패스.

    // function listenToCanvasEvents() {
        listenToMouseDown();
        // listenToMouseMove();
        // listenToMouseUp();
        // listenToDoubleClick();
        // listenToTouchGesture();
        // listenToObjectModified();
    }

    function listenToMouseDown() {
    //     this.canvas.on('mouse:down', (event: any) => {
    //         const evt = event.e;
    //         const mouse = this.canvas.getPointer(evt);
    //
    //         switch (this.toolSelected) {
    //             case Tools.Pan:
    //                 if (evt.type.includes('touch')) {
    //                     return;
    //                 }
    //                 this.lastPosX = evt.clientX;
    //                 this.lastPosY = evt.clientY;
    //                 return;
    //             case Tools.Rectangle:
    //             case Tools.Ellipse:
    //             case Tools.Line:
    //             case Tools.Arrow:
    //                 this.shapeStarted = true;
    //                 this.shapeStartX = mouse.x;
    //                 this.shapeStartY = mouse.y;
    //                 const options = {
    //                     width: 0,
    //                     height: 0,
    //                     left: this.shapeStartX,
    //                     top: this.shapeStartY,
    //                     fill: this.fillColor,
    //                     stroke: this.strokeColor,
    //                     strokeWidth: this.strokeWidth,
    //                 };
    //                 if (this.toolSelected !== Tools.Arrow) {
    //                     const shape = this.createNewShape(options);
    //                     this.addShape(shape);
    //                     this.canvas.renderAll();
    //                     this.shapeBeingAdded = shape;
    //                 } else {
    //                     const shape = [
    //                         new fabric.Line([
    //                             this.shapeStartX,
    //                             this.shapeStartY,
    //                             this.shapeStartX,
    //                             this.shapeStartY,
    //                         ], options),
    //                         new fabric.Triangle({
    //                             ...options,
    //                             fill: this.strokeColor,
    //                             width: this.strokeWidth * 4,
    //                             height: this.strokeWidth * 4,
    //                             originX: 'center',
    //                             originY: 'center',
    //                             id: 'arrow-pointer'
    //                         })
    //                     ];
    //                     this.addShape(shape[0]);
    //                     this.addShape(shape[1]);
    //                     this.canvas.renderAll();
    //                     this.shapeBeingAdded = shape;
    //                 }
    //                 return;
    //             default:
    //                 return;
    //         }
    //     });
    // }




    return(
        <Row>
            <Col xs={3}>
                <Menu/>
            </Col>
            <Col xs={9}>
                <div className="canvas-container">
                    <canvas id="canvas"/>
                </div>
            </Col>
        </Row>
    )
}
