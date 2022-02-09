import React from "react";
import {ProfileStatus} from "./ProfileStatus";
import TestRenderer from 'react-test-renderer';

describe ("ProfileStatus component", ()=> {
     test("status from props should be in the state", () => {
         const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=> {}} />)
         const instance = component.getInstance()
         expect(instance?.props.status).toBe("it-kamasutra.com")
     });

     test ("after creation span should be displayed", ()=> {
         const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=> {}} />)
         const root = component.root
         let span = root.findByType("span")
         expect(span).not.toBeNull()
     })
    test ("after creation input shouldn' be displayed", ()=> {
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=> {}} />)
        const root = component.root
        expect(()=> {
            let input = root.findByType("input")
        }).toThrowError()
    })
    test("input should be displayed in editMode instead of span", ()=> {
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=> {}} />)
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input).not.toBeNull()
    })
 })